"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsVisitor = exports.MAKE_MAYBE_SIGNATURE = exports.MAKE_OPTIONAL_SIGNATURE = exports.EXACT_SIGNATURE = void 0;
const visitor_plugin_common_1 = require("@graphql-codegen/visitor-plugin-common");
// import autoBind from 'auto-bind';
const autoBind = require("auto-bind");
const graphql_1 = require("graphql");
const typescript_variables_to_object_1 = require("./typescript-variables-to-object");
exports.EXACT_SIGNATURE = `type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };`;
exports.MAKE_OPTIONAL_SIGNATURE = `type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };`;
exports.MAKE_MAYBE_SIGNATURE = `type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };`;
class TsVisitor extends visitor_plugin_common_1.BaseTypesVisitor {
    constructor(schema, pluginConfig, additionalConfig = {}) {
        super(schema, pluginConfig, {
            noExport: visitor_plugin_common_1.getConfigValue(pluginConfig.noExport, false),
            avoidOptionals: visitor_plugin_common_1.normalizeAvoidOptionals(visitor_plugin_common_1.getConfigValue(pluginConfig.avoidOptionals, false)),
            maybeValue: visitor_plugin_common_1.getConfigValue(pluginConfig.maybeValue, 'T | null'),
            constEnums: visitor_plugin_common_1.getConfigValue(pluginConfig.constEnums, false),
            enumsAsTypes: visitor_plugin_common_1.getConfigValue(pluginConfig.enumsAsTypes, false),
            futureProofEnums: visitor_plugin_common_1.getConfigValue(pluginConfig.futureProofEnums, false),
            futureProofUnions: visitor_plugin_common_1.getConfigValue(pluginConfig.futureProofUnions, false),
            enumsAsConst: visitor_plugin_common_1.getConfigValue(pluginConfig.enumsAsConst, false),
            numericEnums: visitor_plugin_common_1.getConfigValue(pluginConfig.numericEnums, false),
            onlyOperationTypes: visitor_plugin_common_1.getConfigValue(pluginConfig.onlyOperationTypes, false),
            immutableTypes: visitor_plugin_common_1.getConfigValue(pluginConfig.immutableTypes, false),
            useImplementingTypes: visitor_plugin_common_1.getConfigValue(pluginConfig.useImplementingTypes, false),
            entireFieldWrapperValue: visitor_plugin_common_1.getConfigValue(pluginConfig.entireFieldWrapperValue, 'T'),
            wrapEntireDefinitions: visitor_plugin_common_1.getConfigValue(pluginConfig.wrapEntireFieldDefinitions, false),
            ...(additionalConfig || {}),
        });
        autoBind(this);
        const enumNames = Object.values(schema.getTypeMap())
            .filter(graphql_1.isEnumType)
            .map(type => type.name);
        this.setArgumentsTransformer(new typescript_variables_to_object_1.TypeScriptOperationVariablesToObject(this.scalars, this.convertName, this.config.avoidOptionals, this.config.immutableTypes, null, enumNames, pluginConfig.enumPrefix, this.config.enumValues));
        this.setDeclarationBlockConfig({
            enumNameValueSeparator: ' =',
            ignoreExport: this.config.noExport,
        });
    }
    _getTypeForNode(node) {
        const typeAsString = node.name;
        if (this.config.useImplementingTypes) {
            const allTypesMap = this._schema.getTypeMap();
            const implementingTypes = [];
            // TODO: Move this to a better place, since we are using this logic in some other places as well.
            for (const graphqlType of Object.values(allTypesMap)) {
                if (graphqlType instanceof graphql_1.GraphQLObjectType) {
                    const allInterfaces = graphqlType.getInterfaces();
                    if (allInterfaces.some(int => typeAsString === int.name)) {
                        implementingTypes.push(this.convertName(graphqlType.name));
                    }
                }
            }
            if (implementingTypes.length > 0) {
                return implementingTypes.join(' | ');
            }
        }
        return super._getTypeForNode(node);
    }
    getWrapperDefinitions() {
        const definitions = [
            this.getMaybeValue(),
            this.getExactDefinition(),
            this.getMakeOptionalDefinition(),
            this.getMakeMaybeDefinition(),
        ];
        if (this.config.wrapFieldDefinitions) {
            definitions.push(this.getFieldWrapperValue());
        }
        if (this.config.wrapEntireDefinitions) {
            definitions.push(this.getEntireFieldWrapperValue());
        }
        return definitions;
    }
    getExactDefinition() {
        return `${this.getExportPrefix()}${exports.EXACT_SIGNATURE}`;
    }
    getMakeOptionalDefinition() {
        return `${this.getExportPrefix()}${exports.MAKE_OPTIONAL_SIGNATURE}`;
    }
    getMakeMaybeDefinition() {
        return `${this.getExportPrefix()}${exports.MAKE_MAYBE_SIGNATURE}`;
    }
    getMaybeValue() {
        return `${this.getExportPrefix()}type Maybe<T> = ${this.config.maybeValue};`;
    }
    clearOptional(str) {
        if (str.startsWith('Maybe')) {
            return str.replace(/Maybe<(.*?)>$/, '$1');
        }
        return str;
    }
    getExportPrefix() {
        if (this.config.noExport) {
            return '';
        }
        return super.getExportPrefix();
    }
    NamedType(node, key, parent, path, ancestors) {
        let generated_type = super.NamedType(node, key, parent, path, ancestors);
        // let split_generated_type = generated_type.substring(
        //     generated_type.lastIndexOf("[") + 2,
        //     generated_type.lastIndexOf("]") - 1
        // );
        // @ if the parent is not array  
        if (parent.kind != 'ListType') {
            let typeTemplate = generated_type.indexOf('Scalars') > -1 ? `null` : `new ${generated_type}()`;
            return `Maybe<${super.NamedType(node, key, parent, path, ancestors)}> = ${typeTemplate}`;
        }
        return `Maybe<${super.NamedType(node, key, parent, path, ancestors)}>`;
    }
    ListType(node) {
        // let str = (typeof node.type == 'string') ? node.type : null;
        // let base = this.clearOptional(str);
        return `Maybe<${super.ListType(node)}> = []`;
        // return `Maybe<${super.ListType(node)}>`;
    }
    UnionTypeDefinition(node, key, parent) {
        if (this.config.onlyOperationTypes)
            return '';
        let withFutureAddedValue = [];
        if (this.config.futureProofUnions) {
            withFutureAddedValue = [
                this.config.immutableTypes ? `{ readonly __typename?: "%other" }` : `{ __typename?: "%other" }`,
            ];
        }
        const originalNode = parent[key];
        const possibleTypes = originalNode.types
            .map(t => (this.scalars[t.name.value] ? this._getScalar(t.name.value) : this.convertName(t)))
            .concat(...withFutureAddedValue)
            .join(' | ');
        return new visitor_plugin_common_1.DeclarationBlock(this._declarationBlockConfig)
            .export()
            .asKind('type')
            .withName(this.convertName(node))
            .withComment(node.description)
            .withContent(possibleTypes).string;
        // return super.UnionTypeDefinition(node, key, parent).concat(withFutureAddedValue).join("");
    }
    wrapWithListType(str) {
        return `${this.config.immutableTypes ? 'ReadonlyArray' : 'Array'}<${str}>`;
    }
    NonNullType(node) {
        const baseValue = super.NonNullType(node);
        return this.clearOptional(baseValue);
    }
    FieldDefinition(node, key, parent) {
        const typeString = this.config.wrapEntireDefinitions
            ? `EntireFieldWrapper<${node.type}>`
            : node.type;
        const originalFieldNode = parent[key];
        const addOptionalSign = !this.config.avoidOptionals.field && originalFieldNode.type.kind !== graphql_1.Kind.NON_NULL_TYPE;
        const comment = this.getFieldComment(node);
        const { type } = this.config.declarationKind;
        return (comment +
            visitor_plugin_common_1.indent(`public ${this.config.immutableTypes ? 'readonly ' : ''}${node.name}${addOptionalSign ? '?' : ''}: ${typeString}${this.getPunctuation(type)}`));
    }
    InputValueDefinition(node, key, parent) {
        const originalFieldNode = parent[key];
        const addOptionalSign = !this.config.avoidOptionals.inputValue &&
            (originalFieldNode.type.kind !== graphql_1.Kind.NON_NULL_TYPE ||
                (!this.config.avoidOptionals.defaultValue && node.defaultValue !== undefined));
        const comment = visitor_plugin_common_1.transformComment(node.description, 1);
        const { type } = this.config.declarationKind;
        return (comment +
            visitor_plugin_common_1.indent(`${this.config.immutableTypes ? 'readonly ' : ''}${node.name}${addOptionalSign ? '?' : ''}: ${node.type}${this.getPunctuation(type)}`));
    }
    EnumTypeDefinition(node) {
        const enumName = node.name;
        // In case of mapped external enum string
        if (this.config.enumValues[enumName] && this.config.enumValues[enumName].sourceFile) {
            return `export { ${this.config.enumValues[enumName].typeIdentifier} };\n`;
        }
        const getValueFromConfig = (enumValue) => {
            if (this.config.enumValues[enumName] &&
                this.config.enumValues[enumName].mappedValues &&
                typeof this.config.enumValues[enumName].mappedValues[enumValue] !== 'undefined') {
                return this.config.enumValues[enumName].mappedValues[enumValue];
            }
            return null;
        };
        const withFutureAddedValue = [
            this.config.futureProofEnums ? [visitor_plugin_common_1.indent('| ' + visitor_plugin_common_1.wrapWithSingleQuotes('%future added value'))] : [],
        ];
        const enumTypeName = this.convertName(node, { useTypesPrefix: this.config.enumPrefix });
        if (this.config.enumsAsTypes) {
            return new visitor_plugin_common_1.DeclarationBlock(this._declarationBlockConfig)
                .export()
                .asKind('type')
                .withComment(node.description)
                .withName(enumTypeName)
                .withContent('\n' +
                node.values
                    .map(enumOption => {
                    var _a;
                    const name = enumOption.name;
                    const enumValue = (_a = getValueFromConfig(name)) !== null && _a !== void 0 ? _a : name;
                    const comment = visitor_plugin_common_1.transformComment(enumOption.description, 1);
                    return comment + visitor_plugin_common_1.indent('| ' + visitor_plugin_common_1.wrapWithSingleQuotes(enumValue));
                })
                    .concat(...withFutureAddedValue)
                    .join('\n')).string;
        }
        if (this.config.numericEnums) {
            const block = new visitor_plugin_common_1.DeclarationBlock(this._declarationBlockConfig)
                .export()
                .withComment(node.description)
                .withName(enumTypeName)
                .asKind('enum')
                .withBlock(node.values
                .map((enumOption, i) => {
                const valueFromConfig = getValueFromConfig(enumOption.name);
                const enumValue = valueFromConfig !== null && valueFromConfig !== void 0 ? valueFromConfig : i;
                const comment = visitor_plugin_common_1.transformComment(enumOption.description, 1);
                return comment + visitor_plugin_common_1.indent(enumOption.name) + ` = ${enumValue}`;
            })
                .concat(...withFutureAddedValue)
                .join(',\n')).string;
            return block;
        }
        if (this.config.enumsAsConst) {
            const typeName = `export type ${enumTypeName} = typeof ${enumTypeName}[keyof typeof ${enumTypeName}];`;
            const enumAsConst = new visitor_plugin_common_1.DeclarationBlock({
                ...this._declarationBlockConfig,
                blockTransformer: block => {
                    return block + ' as const';
                },
            })
                .export()
                .asKind('const')
                .withName(enumTypeName)
                .withComment(node.description)
                .withBlock(node.values
                .map(enumOption => {
                var _a;
                const optionName = this.convertName(enumOption, { useTypesPrefix: false, transformUnderscore: true });
                const comment = visitor_plugin_common_1.transformComment(enumOption.description, 1);
                const name = enumOption.name;
                const enumValue = (_a = getValueFromConfig(name)) !== null && _a !== void 0 ? _a : name;
                return comment + visitor_plugin_common_1.indent(`${optionName}: ${visitor_plugin_common_1.wrapWithSingleQuotes(enumValue)}`);
            })
                .join(',\n')).string;
            return [enumAsConst, typeName].join('\n');
        }
        return new visitor_plugin_common_1.DeclarationBlock(this._declarationBlockConfig)
            .export()
            .asKind(this.config.constEnums ? 'const enum' : 'enum')
            .withName(enumTypeName)
            .withComment(node.description)
            .withBlock(this.buildEnumValuesBlock(enumName, node.values)).string;
    }
    getPunctuation(_declarationKind) {
        return ';';
    }
}
exports.TsVisitor = TsVisitor;
//# sourceMappingURL=visitor.js.map