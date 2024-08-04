FROM node:22-alpine3.19 as builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY .npmrc ./
COPY src ./src
COPY tools ./tools
RUN npm install -g npm@latest
RUN npm ci --legacy-peer-deps && npm run build

FROM node:22-alpine3.19

WORKDIR /app
RUN apk add --no-cache curl
COPY package*.json ./
COPY tsconfig.json ./
COPY .npmrc ./
RUN npm install -g pm2 npm@latest
RUN npm ci --legacy-peer-deps --production
COPY --from=builder /app/build ./build

EXPOSE 4001

CMD [ "npm", "run", "start" ]