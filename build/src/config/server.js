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
exports.buildServer = void 0;
const fastify_1 = __importDefault(require("fastify"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify_cron_1 = __importDefault(require("fastify-cron"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const logger_1 = require("./logger");
const auth_routes_1 = require("../modules/auth/auth.routes");
const httpResponse_1 = require("../utils/httpResponse");
const user_routes_1 = require("../modules/user/user.routes");
const exercise_routes_1 = require("../modules/exercise/exercise.routes");
const package_json_1 = require("../../package.json");
const auth_schemas_1 = require("../modules/auth/auth.schemas");
const user_schemas_1 = require("../modules/user/user.schemas");
const exercise_schemas_1 = require("../modules/exercise/exercise.schemas");
const registerSchemas_1 = require("../utils/registerSchemas");
const environment_variables_1 = require("./environment-variables");
const cron_time_1 = require("../enums/cron-time");
/**
 * This function creates and configures a Fastify server instance, registering plugins, defining routes, and returning the configured server.
 */
function buildServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const loggerConfig = logger_1.logger; // Your logger configuration;
        const app = (0, fastify_1.default)({
            logger: loggerConfig,
        });
        /* REGISTER PLUGINS */
        app.register(jwt_1.default, {
            secret: environment_variables_1.environmentVariables.authentication.jwtSecret,
        });
        app.addHook("preHandler", (request, _reply, next) => {
            // here we are
            request.jwt = app.jwt;
            return next();
        });
        //! check if fastify cookie is needed
        app.register(cookie_1.default, {
            secret: environment_variables_1.environmentVariables.authentication.cookieSecret,
            hook: "preHandler",
        });
        /**
         * Register the schemas available for validation within the Fastify app, ensuring that incoming requests conform to the specified data structures.
         */
        (0, registerSchemas_1.registerSchemas)(app, [...auth_schemas_1.authSchemas, ...user_schemas_1.userSchemas, ...exercise_schemas_1.exerciseSchemas]);
        app.register(swagger_1.default, {
            swagger: {
                info: {
                    title: "FitLog API Docs",
                    description: "This is a short documentation for FitLog API",
                    version: package_json_1.version,
                },
                host: `localhost:${environment_variables_1.environmentVariables.default.port}`,
                schemes: ["http", "https"],
                consumes: ["application/json"],
                produces: ["application/json"],
                tags: [
                    {
                        name: "Auth" /* SWAGGER_TAGS.AUTH */,
                        description: `${"Auth" /* SWAGGER_TAGS.AUTH */} API`,
                    },
                    {
                        name: "User" /* SWAGGER_TAGS.USER */,
                        description: `${"User" /* SWAGGER_TAGS.USER */} API`,
                    },
                    {
                        name: "Exercise" /* SWAGGER_TAGS.EXERCISE */,
                        description: `${"Exercise" /* SWAGGER_TAGS.EXERCISE */} API`,
                    },
                ],
                securityDefinitions: {
                    Bearer: {
                        type: "apiKey",
                        name: "Authorization",
                        in: "header",
                        description: "Enter the token with the `Bearer: ` prefix, e.g. `Bearer abcde12345`",
                    },
                },
                security: [{ Bearer: [] }],
            },
        });
        app.register(swagger_ui_1.default, {
            routePrefix: "/docs",
            staticCSP: false,
            uiConfig: {
                docExpansion: "list", // expand/not all the documentations none|list|full
                deepLinking: true,
            },
            transformStaticCSP(header) {
                return header;
            },
        });
        app.register(cors_1.default, {
            origin: [
                `http://localhost:${environment_variables_1.environmentVariables.default.port}`,
                // `http://127.0.0.1:${port}`,
                // process.env.HEROKU_URL
            ],
            methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
        });
        /* CRON JOBS */
        app.register(fastify_cron_1.default, {
            jobs: [
                {
                    cronTime: cron_time_1.CRON_TIME.FIRST_DAY_OF_MONTH_MIDNIGHT,
                    /**
                     * !consider replacing the inject method with the handler that does the cleanup, otherwise can be some inconsistencies for the check from pre-handler for each route
                     */
                    onTick: (app) => __awaiter(this, void 0, void 0, function* () {
                        try {
                            yield app.inject({
                                url: "/api/auth/cleanup-otp-users",
                                method: "POST",
                            });
                        }
                        catch (err) {
                            console.error(err);
                        }
                    }),
                },
            ],
        });
        /* DECORATORS */
        app.decorate("authenticate", (request) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const accessToken = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
                const refreshToken = request.cookies["refresh_token"];
                if (!accessToken && !refreshToken) {
                    return (0, httpResponse_1.createHttpException)({
                        status: 401 /* HTTP_STATUS_CODE.UNAUTHORIZED */,
                        message: "Access Denied. No token provided.",
                        method: "Authenticate decorator",
                    });
                }
                const decodedAccessToken = request.jwt.verify(accessToken);
                request.user = decodedAccessToken;
            }
            catch (error) {
                const errorResponse = error;
                return (0, httpResponse_1.createHttpException)({
                    status: 401 /* HTTP_STATUS_CODE.UNAUTHORIZED */,
                    message: errorResponse.message,
                    method: "Authenticate decorator",
                });
            }
        }));
        /* REGISTER ROUTES */
        app.get("/healthcheck", () => __awaiter(this, void 0, void 0, function* () {
            return { status: "OK" };
        }));
        app.register(auth_routes_1.authRoutes, { prefix: "/api/auth" });
        app.register(user_routes_1.userRoutes, { prefix: "/api/user" });
        app.register(exercise_routes_1.exerciseRoutes, { prefix: "/api/exercises" });
        return app;
    });
}
exports.buildServer = buildServer;
