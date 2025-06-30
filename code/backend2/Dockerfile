FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY ./ ./

RUN yarn build

FROM node:18-alpine AS prod

WORKDIR /app

RUN apk --no-cache add curl

COPY --from=builder /app ./

EXPOSE 3001

CMD ["sh", "-c", "yarn migrate && node dist/index.js"]