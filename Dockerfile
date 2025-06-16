FROM node:14


WORKDIR /app


COPY package.json package-lock.json ./
RUN npm install


COPY public ./public
COPY src ./src

RUN npm install -g serve


EXPOSE 3002
CMD ["serve", "-s", "build", "-l", "3002"]