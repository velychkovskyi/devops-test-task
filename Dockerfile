# # ---- Base Node ----
FROM alpine AS base
# install node
RUN apk add --no-cache nodejs-current npm
# set working directory
WORKDIR /

# # ---- Dependencies ----
FROM base AS dependencies
# install node packages
COPY package.json .
RUN npm install

# # ---- Test ----
FROM dependencies AS test
# run linters
COPY . .
RUN npm run lint

# # ---- Release ----
FROM base AS release
# copy app sources
COPY . .
COPY --from=dependencies /node_modules ./node_modules
# expose port and define CMD
EXPOSE 3050
CMD npm run start
