FROM node:16-slim
RUN apt-get update
RUN apt-get install -y openssl

RUN mkdir -p /app

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json tsconfig.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

RUN npx prisma generate --schema=./src/prisma/schema.prisma

EXPOSE 80
CMD [ "npm", "run", "pm2" ]
