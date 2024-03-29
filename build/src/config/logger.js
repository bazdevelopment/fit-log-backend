"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
const environment_variables_1 = require("./environment-variables");
exports.logger = (0, pino_1.default)({
    enabled: environment_variables_1.environmentVariables.default.nodeEnvironment === "local",
    transport: {
        target: "pino-pretty",
    },
});
