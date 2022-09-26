package com.verduttio.cinemaapp.service.storage;

import com.verduttio.cinemaapp.entity.storage.ImageStorageProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

@Service
public class ImageStorageService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final Path rootLocation;
    private final FileStorage fileStorage;

    @Autowired
    public ImageStorageService(ImageStorageProperties properties, FileStorage fileStorage) {
        this.rootLocation = Paths.get(properties.getLocation());
        this.fileStorage = fileStorage;
    }

    public void store(MultipartFile file, String userId) {
        fileStorage.store(file, pathTemp(userId));
    }

    private Path pathTemp(String userId) {
        return this.rootLocation
                .resolve(userId)
                .resolve("temp");
    }

    private Path pathHome(String userId) {
        return this.rootLocation
                .resolve("images")
                .resolve(userId);
    }

    public Stream<Path> loadAll(String userId) {
        Path path = pathHome(userId);
        return fileStorage.loadAll(path);
    }

    public Path loadFromHome(String filename, String userId) {
        return fileStorage.load(filename, pathHome(userId));
    }

    public Path loadFromTemp(String filename, String userId) {
        return fileStorage.load(filename, pathTemp(userId));
    }

    public Resource loadAsResourceFromHome(String filename, String userId) {
        return fileStorage.loadAsResource(filename, pathHome(userId));
    }

    public Resource loadAsResourceFromTemp(String filename, String userId) {
        return fileStorage.loadAsResource(filename, pathTemp(userId));
    }

    public void deleteAll(String userId) {
        fileStorage.deleteAll(pathHome(userId));
    }

    public void delete(String fileName, String userId) {
        fileStorage.delete(fileName, pathHome(userId));
    }
}