"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.environmentVariables = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.environmentVariables = {
    database: {
        url: process.env.DATABASE_URL,
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET,
        cookieSecret: process.env.COOKIE_SECRET,
        jwtAccessTokenExpires: process.env.JWT_ACCESS_TOKEN_EXPIRES,
        jwtRefreshTokenExpires: process.env.JWT_REFRESH_TOKEN_EXPIRES,
    },
    emailProvider: {
        resendApiKey: process.env.RESEND_API_KEY,
    },
    default: {
        port: process.env.PORT,
        host: process.env.HOST,
        nodeEnvironment: process.env.NODE_ENV,
    },
};
