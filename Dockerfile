# Project env
FROM node:23-alpine3.20

# Container directory
WORKDIR /app

#  Copy my file to Container
COPY . .

# Install packages
RUN npm install

# container port
EXPOSE 5173

# last command to run the project
CMD ["npm","run", "dev"]