package com.verduttio.cinemaapp.entity.storage;


import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("storage")
public class ImageStorageProperties implements StorageProperties{
    private String locationMain = "files/images";

    private String locationTemp = "files/images/temp";

    @Override
    public String getLocationMain() {
        return locationMain;
    }

    @Override
    public void setLocationMain(String location) {
        this.locationMain = location;
    }

    @Override
    public String getLocationTemp() {
        return locationTemp;
    }

    @Override
    public void setLocationTemp(String location) {
        this.locationTemp = location;
    }
}
