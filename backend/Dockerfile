FROM node:20.11.0

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY src/.env ./
RUN npx tsc
EXPOSE 8000
CMD ["npx", "ts-node", "src/server.ts"]
