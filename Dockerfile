FROM node:16-alpine3.12

WORKDIR /app

COPY package*.json ./

RUN npm install --only=prod

COPY src/ src/

EXPOSE 443

CMD [ "npm", "start" ]
