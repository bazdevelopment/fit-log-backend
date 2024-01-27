"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const environment_variables_1 = require("./config/environment-variables");
const server_1 = require("./config/server");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const signals = ["SIGINT", "SIGTERM"];
/**
 * The gracefulShutDownApp function is responsible for performing the necessary cleanup and shutting down the application gracefully. In this specific example, it closes the application instance asynchronously.
 */
const gracefulShutDownApp = (app) => __awaiter(void 0, void 0, void 0, function* () {
    yield app.close();
    process.exit(0);
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield (0, server_1.buildServer)();
        /** start the node server */
        app.listen({
            port: Number(environment_variables_1.environmentVariables.default.port),
            host: environment_variables_1.environmentVariables.default.host,
        });
        /** enable all the jobs */
        app.cron.startAllJobs();
        /** The following code snippet demonstrates the implementation of a graceful shutdown mechanism for a Node.js application using signals. This ensures that the application handles termination signals gracefully, allowing it to perform necessary cleanup tasks before shutting down.
         */
        for (const signal of signals) {
            process.on(signal, () => __awaiter(this, void 0, void 0, function* () {
                yield gracefulShutDownApp(app);
            }));
        }
    });
}
main();
