# Image of node you need
FROM node:22.14.0-alpine AS builder

# Destination folder inside the container to place your app
WORKDIR /app

# Package json files to install node_modules
COPY package.json package.json
COPY package-lock.json package-lock.json

# Install node modules - clean installation
RUN npm ci

# Now, move all the missing files into destination folder
COPY tsconfig.json tsconfig.json
COPY server/ server/
COPY domain/ domain/

# Create build folder that contains compliled typescript
RUN npm run build

# Replace the container with the build that u just built, From remplace image cap, and remplace the *AS 
FROM node:22.14.0-alpine
WORKDIR /app

COPY --from=builder /app/build ./build/ 
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules/




