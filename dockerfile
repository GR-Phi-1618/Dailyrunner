FROM node:latest

RUN apt update

RUN apt upgrade

RUN apt install chrome-gnome-shell

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npx","ts-node","dailyrunner.ts"]
