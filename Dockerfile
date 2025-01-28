FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY ./src/server.js /app/server.js
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
