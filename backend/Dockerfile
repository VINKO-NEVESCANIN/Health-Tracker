# Imagen de producción del backend (sirve en Render, Railway, Fly.io, etc.)
FROM node:22-slim

# Prisma necesita openssl
RUN apt-get update -y && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# prisma.config.ts puede exigir DATABASE_URL solo para generar el cliente; se usa un valor de relleno
RUN DATABASE_URL="postgresql://build:build@localhost:5432/build" npm run build

ENV NODE_ENV=production
EXPOSE 4000

# Aplica migraciones pendientes y arranca
CMD ["npm", "run", "start:prod"]
