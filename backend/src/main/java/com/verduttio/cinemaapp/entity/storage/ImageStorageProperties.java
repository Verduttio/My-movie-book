package com.verduttio.cinemaapp.entity.storage;


import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("storage")
public class ImageStorageProperties implements StorageProperties{
    private String location = "files/images/";

    @Override
    public String getLocation() {
        return location;
    }

    @Override
    public void setLocation(String location) {
        this.location = location;
    }
}
