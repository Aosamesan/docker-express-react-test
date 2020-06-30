FROM node:14

# install pm2
RUN npm install pm2 -g

# App Directory
WORKDIR /usr/src/testApp

# Copy
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm install
# build express
RUN npm run build:back
# build react
RUN npm run build:front

# expose port
EXPOSE 33000

# daemon command
CMD ["pm2-runtime", "test-app.config.js", "--env", "production"]