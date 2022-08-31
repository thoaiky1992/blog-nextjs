FROM node:14
WORKDIR /user/src/app

COPY package*.json ./
RUN yarn install

COPY . .
RUN yarn build

EXPOSE 3000
CMD [ "sh", "start.sh" ]
