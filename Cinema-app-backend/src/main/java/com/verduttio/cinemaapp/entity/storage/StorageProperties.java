package com.verduttio.cinemaapp.entity.storage;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("storage")
public class StorageProperties {
    /**
     * Folder location for storing files
     */
    private String locationMain = "files/images";

    private String locationTemp = "files/images/temp";

    public String getLocationMain() {
        return locationMain;
    }

    public void setLocationMain(String location) {
        this.locationMain = location;
    }

    public String getLocationTemp() {
        return locationTemp;
    }

    public void setLocationTemp(String location) {
        this.locationTemp = location;
    }
}
