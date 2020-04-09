FROM node:latest

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 80

CMD ["node", "./node_modules/pm2/bin/pm2-runtime", "start", "dist/index.js"]
