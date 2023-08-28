
# ############## Building Web App ###########

# Fetching the latest node image on apline linux
FROM alpine:latest AS builder

# Installing node js and npm
RUN apk add --update nodejs npm

# Declaring env
ENV NODE_ENV production

# Setting up the work directory
WORKDIR /app

# Copying package.json for Installing code dependencies
COPY ./package.json ./

# Installing dependencies
RUN npm install

# Copying all the files in our project
COPY . .

# Building our application
RUN npm run build

###### Building Server and Adding chunks from builder ########

# Fetching the latest alpine
FROM alpine

WORKDIR /opt/streetshoppe/

# Installing node js and npm
RUN apk add --update nodejs npm

ENV NODE_ENV production

# Copying package.json for Installing code dependencies
COPY server ./

RUN ls -la  && npm install

# Copying built assets from builder
COPY --from=builder /app/build ./

CMD ["node","/opt/streetshoppe/server.js"]



