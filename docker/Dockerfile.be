FROM node:22-alpine

WORKDIR /app

COPY ./http-server/package*.json ./

RUN npm install

COPY ./http-server ./

COPY ./prisma ./prisma

RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "run", "dev"]
