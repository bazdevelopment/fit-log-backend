"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchemas = void 0;
/**
 * Utility function used to register all json schemas linked to models
 */
function registerSchemas(app, schemas) {
    schemas.forEach((schema) => app.addSchema(schema));
}
exports.registerSchemas = registerSchemas;
