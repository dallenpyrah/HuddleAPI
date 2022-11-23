FROM node:18.7.0

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8001

CMD [ "npm", "run", "start" ]