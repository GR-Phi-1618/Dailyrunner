FROM node:latest

RUN apt update

RUN apt upgrade -y

RUN apt install firefox -y

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npx","ts-node","dailyrunner.ts"]
