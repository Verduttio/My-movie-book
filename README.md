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

Initially, you need to change the REACT_APP_HOST variable in docker-compose.yml in root directory. You can either provide localhost:8080 or your machine IP (you can find your machine IP using `ifconfig` on Linux or `ipconfig` on Windows.

Firstly, you have to build .jar file of Spring boot app. To do this, simply execute the following command in backend directory:
```bash
./gradlew build
```
The JAR should now be created in /backend/build/libs.

Now, to run the application, firstly build the containers:

```bash
docker compose build
```

Secondly, run the containers:
```bash
docker compose up
```

The application should be running now.

In case of any errors while executing docker commands, try using them with preceding command *sudo*.
Like: `sudo docker compose build`.

## Screenshots
![demo_1_1](https://user-images.githubusercontent.com/72033031/210176631-2ed5dc92-4c8e-41dd-ac29-995fb682eb72.png)
![demo_2](https://user-images.githubusercontent.com/72033031/209668184-0345d870-bc82-4f42-a5db-6c3f7bd4e36d.png)
![demo_3](https://user-images.githubusercontent.com/72033031/209668234-e2f21c75-ebda-4968-bee4-7bdd32816839.png)

## Dev note
The app is still in development. Many issues are known and are being fixed.
Major things to solve are currently:
  * storage management. After recreating docker container all user folders are gone.
  * frontend<-->backend configuration. 

