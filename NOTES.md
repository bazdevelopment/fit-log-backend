## dependencies
yarn add @prisma/client fastify fastify-zod zod zod-to-json-schema fastify-jwt fastify-swagger

## devDependencies
yarn add ts-node-dev typescript @types/node --dev

## Initialise prisma
npx prisma init --datasource-provider postgresql

### Migrate the schema
npx prisma migrate dev --name init

### Initialize typescript
npx tsc --init

### Build command (not sure if npx prisma generate && npx prisma migrate are needed)
"build": "tsc && npx prisma generate && npx prisma migrate"


