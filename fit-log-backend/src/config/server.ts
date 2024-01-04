import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RawServerDefault,
} from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifytJwt, { JWT } from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import swagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { logger } from "./logger";
import { authRoutes } from "../modules/auth/auth.routes";
import { ICustomError, createHttpException } from "../utils/httpResponse";
import { HTTP_STATUS_CODE } from "../enums/HttpStatusCodes";
import { IDecodedRefreshToken, TSignInUser } from "../modules/auth/auth.types";
import { userRoutes } from "../modules/user/user.routes";
import { TUpdateUser } from "../modules/user/user.types";
import { exerciseRoutes } from "../modules/exercise/exercise.routes";
import { version } from "../../package.json";
import { authSchemas } from "../modules/auth/auth.schemas";
import { userSchemas } from "../modules/user/user.schemas";
import { exerciseSchemas } from "../modules/exercise/exercise.schemas";
import { registerSchemas } from "../utils/registerSchemas";
import { Logger } from "pino";
import { IncomingMessage, ServerResponse } from "http";
import { SWAGGER_TAGS } from "../enums/SwaggerTags";
declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest<{
        Body: TSignInUser | TUpdateUser;
        Querystring: {
          bodyPart: string;
          equipmentType: string;
          target: string;
          limit: string;
          offset: string;
          name: string;
        };
        Params: {
          exerciseId: string;
        };
      }>,
      reply: FastifyReply
    ) => Promise<void>;
  }
  interface FastifyRequest {
    jwt: JWT;
  }
}
declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      otpCode: string;
    }; // payload type is used for signing and verifying
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    }; // user type is return type of `request.user` object
  }
}

/**
 * This function creates and configures a Fastify server instance, registering plugins, defining routes, and returning the configured server.
 */
export async function buildServer() {
  const loggerConfig: Logger = logger; // Your logger configuration;

  const app: FastifyInstance<
    RawServerDefault,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    Logger
  > = fastify({
    logger: loggerConfig,
  });

  /* REGISTER PLUGINS */
  app.register(fastifytJwt, {
    secret: process.env.JWT_SECRET!,
  });

  app.addHook(
    "preHandler",
    (request: FastifyRequest, _reply: FastifyReply, next) => {
      // here we are
      request.jwt = app.jwt;
      return next();
    }
  );

  //! check if fastify cookie is needed
  app.register(fastifyCookie, {
    secret: process.env.JWT_SECRET!,
    hook: "preHandler",
  });

  /**
   * Register the schemas available for validation within the Fastify app, ensuring that incoming requests conform to the specified data structures.
   */
  registerSchemas(app, [...authSchemas, ...userSchemas, ...exerciseSchemas]);

  app.register(swagger, {
    swagger: {
      info: {
        title: "FitLog API Docs",
        description: "This is a short documentation for FitLog API",
        version,
      },
      host: `localhost:${process.env.PORT}`,
      schemes: ["http", "https"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [
        {
          name: SWAGGER_TAGS.AUTH,
          description: `${SWAGGER_TAGS.AUTH} API`,
        },
        {
          name: SWAGGER_TAGS.USER,
          description: `${SWAGGER_TAGS.USER} API`,
        },
        {
          name: SWAGGER_TAGS.EXERCISE,
          description: `${SWAGGER_TAGS.EXERCISE} API`,
        },
      ],
      securityDefinitions: {
        Bearer: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
          description:
            "Enter the token with the `Bearer: ` prefix, e.g. `Bearer abcde12345`",
        },
      },
      security: [{ Bearer: [] }],
    },
  });

  app.register(fastifySwaggerUi, {
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

  app.register(fastifyCors, {
    origin: [
      `http://localhost:${process.env.PORT}`,
      // `http://127.0.0.1:${port}`,
      // process.env.HEROKU_URL
    ],
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
  });

  /* DECORATORS */
  app.decorate(
    "authenticate",
    async (request: FastifyRequest): Promise<any | ICustomError> => {
      try {
        const accessToken = request.headers.authorization?.replace(
          "Bearer ",
          ""
        );
        const refreshToken = request.cookies["refresh_token"];
        if (!accessToken && !refreshToken) {
          return createHttpException({
            status: HTTP_STATUS_CODE.UNAUTHORIZED,
            message: "Access Denied. No token provided.",
            method: "Authenticate decorator",
          });
        }

        const decodedAccessToken: IDecodedRefreshToken = request.jwt.verify(
          accessToken as string
        );
        request.user = decodedAccessToken;
      } catch (error: unknown) {
        const errorResponse = error as ICustomError;
        return createHttpException({
          status: HTTP_STATUS_CODE.UNAUTHORIZED,
          message: errorResponse.message,
          method: "Authenticate decorator",
        });
      }
    }
  );

  /* REGISTER ROUTES */
  app.get("/healthcheck", async () => {
    return { status: "OK" };
  });

  app.register(authRoutes, { prefix: "/api/auth" });
  app.register(userRoutes, { prefix: "/api/user" });
  app.register(exerciseRoutes, { prefix: "/api/exercises" });

  return app;
}
