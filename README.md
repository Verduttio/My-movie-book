# My-movie-book

[![Deploy backend](https://github.com/Verduttio/My-movie-book/actions/workflows/action-backend.yml/badge.svg)](https://github.com/Verduttio/My-movie-book/actions/workflows/action-backend.yml)
[![Deploy frontend](https://github.com/Verduttio/My-movie-book/actions/workflows/action-frontend.yml/badge.svg)](https://github.com/Verduttio/My-movie-book/actions/workflows/action-frontend.yml)

## App info

My movie book is a full stack app written in Spring boot and ReactJS. 

Its main feature is to store info about your favurite movies and these ones which you would like to watch. You can fetch your movie's data automatically, just by providing a filmweb link. It will also fetch imdb rating. You can also fill the info manually if you want.

Everything simple and in one place. Thanks to it, you will never forget what you wanted to watch!

## Demo

```
my-movie-book.herokuapp.com
```

**Note that the website might not load instantly, it can take up to 1 minute to startup frontend. Then when you try to register or log in you have to wait another 1 minute to start up the backend!**

**Also note, that I have not configured the data persistence layer (user's files, DB is okay) on heroku. So after the server goes down, all your movie posters would be lost, and you will not be able to add new movies. In the near future I will configure the data on heroku and everything will be ok.**

## Prerequisites to run on your own machine
  * docker
  * docker-compose

## Usage

Initially, you need to **change** the `REACT_APP_HOST` variable in `docker-compose.yml` in root directory. You can either provide:
```
REACT_APP_HOST=localhost:8080
```
or your machine IP (**you can find your machine IP using `ifconfig` on Linux or `ipconfig` on Windows**):
```
REACT_APP_HOST=192.168.0.154:8080
```

Then, you have to build .jar file of Spring boot app. To do this, simply execute the following command in `/backend` directory:
```bash
./gradlew build
```
The JAR should now be created in /backend/build/libs.

Now, to run the application, firstly build the containers, exeucute the command in the root of the project's folder:

```bash
docker compose build
```

Secondly, run the containers:
```bash
docker compose up
```

**The application should be running now.**

To access the app simply go to `http://{REACT_APP_HOST}:3000` so for example `http://localhost:3000`.

In case of any errors while executing docker commands, try using them with preceding command *sudo*.
Like: `sudo docker compose build`.

## Screenshots

![login](https://github.com/user-attachments/assets/17a1fa94-79a8-40dc-8a6c-e535ef89727f)
![movies](https://github.com/user-attachments/assets/5250970e-2c52-4885-8523-2cbe0ec56246)
![movie](https://github.com/user-attachments/assets/248821f1-786c-409a-bd53-65fd526e57ec)
![add](https://github.com/user-attachments/assets/ff2c45fa-9579-43f6-ba28-01f91b706fae)


## Dev note
The app is still in development. Many issues are known and are being fixed.
Major things to solve are currently:
  * storage management. After recreating docker container all user folders are gone.
  * frontend<-->backend configuration. 

