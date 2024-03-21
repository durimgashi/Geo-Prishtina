FROM node:21

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

RUN sleep 5

COPY . .

EXPOSE 3000

CMD ["yarn", "run", "start:dev"]
