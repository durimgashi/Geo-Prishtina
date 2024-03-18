FROM node:21

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

RUN sleep 2000

COPY . .

EXPOSE 3000

CMD ["yarn", "run", "start:dev"]
