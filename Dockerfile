# Build stage
FROM node:current-alpine3.19 AS build

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --omit=dev && npm cache clean --force

# Production stage

FROM node:current-alpine3.19 as prod

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD [ "node", "./dist/src/main.js" ]



