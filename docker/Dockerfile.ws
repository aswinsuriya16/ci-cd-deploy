FROM node:22-alpine

WORKDIR /app

COPY ./ws-server/package.* .

RUN npm install

COPY ./ws-server .

EXPOSE 8080

CMD ["npm", "run" , "dev"]
