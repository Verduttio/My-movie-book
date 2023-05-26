package com.verduttio.cinemaapp;

import com.verduttio.cinemaapp.entity.storage.ImageStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
//@SpringBootApplication(exclude = {MongoAutoConfiguration.class})
//@SpringBootApplication(exclude = {MongoAutoConfiguration.class })
@EnableConfigurationProperties(ImageStorageProperties.class)
@EnableMongoRepositories
public class CinemaAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(CinemaAppApplication.class, args);
    }

}
