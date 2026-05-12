FROM node:22-alpine
RUN apk add --no-cache openssl
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3333
CMD ["sh", "-c", "npx prisma db push --accept-data-loss && node dist/index.js"]
