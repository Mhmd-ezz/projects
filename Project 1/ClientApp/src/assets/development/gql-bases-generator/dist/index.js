"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.includeIntrospectionDefinitions = exports.plugin = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const visitor_1 = require("./visitor");
const introspection_visitor_1 = require("./introspection-visitor");
const schema_ast_1 = require("@graphql-codegen/schema-ast");
tslib_1.__exportStar(require("./typescript-variables-to-object"), exports);
tslib_1.__exportStar(require("./visitor"), exports);
tslib_1.__exportStar(require("./config"), exports);
tslib_1.__exportStar(require("./introspection-visitor"), exports);
const plugin = (schema, documents, config) => {
    const { schema: _schema, ast } = schema_ast_1.transformSchemaAST(schema, config);
    const visitor = new visitor_1.TsVisitor(_schema, config);
    const visitorResult = graphql_1.visit(ast, { leave: visitor });
    const introspectionDefinitions = includeIntrospectionDefinitions(_schema, documents, config);
    const scalars = visitor.scalarsDefinition;
    return {
        prepend: [...visitor.getEnumsImports(), ...visitor.getScalarsImports(), ...visitor.getWrapperDefinitions()],
        content: [scalars, ...visitorResult.definitions, ...introspectionDefinitions].join('\n'),
    };
};
exports.plugin = plugin;
function includeIntrospectionDefinitions(schema, documents, config) {
    const typeInfo = new graphql_1.TypeInfo(schema);
    const usedTypes = [];
    const documentsVisitor = graphql_1.visitWithTypeInfo(typeInfo, {
        Field() {
            const type = graphql_1.getNamedType(typeInfo.getType());
            if (graphql_1.isIntrospectionType(type) && !usedTypes.includes(type)) {
                usedTypes.push(type);
            }
        },
    });
    documents.forEach(doc => graphql_1.visit(doc.document, documentsVisitor));
    const typesToInclude = [];
    usedTypes.forEach(type => {
        collectTypes(type);
    });
    const visitor = new introspection_visitor_1.TsIntrospectionVisitor(schema, config, typesToInclude);
    const result = graphql_1.visit(graphql_1.parse(graphql_1.printIntrospectionSchema(schema)), { leave: visitor });
    // recursively go through each `usedTypes` and their children and collect all used types
    // we don't care about Interfaces, Unions and others, but Objects and Enums
    function collectTypes(type) {
        if (typesToInclude.includes(type)) {
            return;
        }
        typesToInclude.push(type);
        if (graphql_1.isObjectType(type)) {
            const fields = type.getFields();
            Object.keys(fields).forEach(key => {
                const field = fields[key];
                const type = graphql_1.getNamedType(field.type);
                collectTypes(type);
            });
        }
    }
    return result.definitions;
}
exports.includeIntrospectionDefinitions = includeIntrospectionDefinitions;
//# sourceMappingURL=index.js.map