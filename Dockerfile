FROM node:8

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli

RUN mv /app/node_modules /node_modules

# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . /app
EXPOSE 4201