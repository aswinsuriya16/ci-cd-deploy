FROM node:22-alpine

WORKDIR /app

COPY ./http-server/package.* .

RUN npm install

COPY ./http-server .
COPY ./prisma .

RUN npm install prisma
RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "run" , "dev"]
