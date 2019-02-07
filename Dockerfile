FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli

COPY . .
EXPOSE 4201
CMD [ "npm", "start" ]
