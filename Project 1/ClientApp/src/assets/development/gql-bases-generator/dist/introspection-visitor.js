"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsIntrospectionVisitor = void 0;
const visitor_1 = require("./visitor");
// import autoBind from 'auto-bind';
const autoBind = require("auto-bind");
class TsIntrospectionVisitor extends visitor_1.TsVisitor {
    constructor(schema, pluginConfig = {}, typesToInclude) {
        super(schema, pluginConfig);
        this.typesToInclude = [];
        this.typesToInclude = typesToInclude;
        autoBind(this);
    }
    DirectiveDefinition() {
        return null;
    }
    ObjectTypeDefinition(node, key, parent) {
        const name = node.name;
        if (this.typesToInclude.some(type => type.name === name)) {
            return super.ObjectTypeDefinition(node, key, parent);
        }
        return null;
    }
    EnumTypeDefinition(node) {
        const name = node.name;
        if (this.typesToInclude.some(type => type.name === name)) {
            return super.EnumTypeDefinition(node);
        }
        return null;
    }
}
exports.TsIntrospectionVisitor = TsIntrospectionVisitor;
//# sourceMappingURL=introspection-visitor.js.map