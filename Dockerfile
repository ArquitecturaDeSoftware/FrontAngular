FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli@

COPY . .

EXPOSE 4201
CMD [ "n", "serve" ]
