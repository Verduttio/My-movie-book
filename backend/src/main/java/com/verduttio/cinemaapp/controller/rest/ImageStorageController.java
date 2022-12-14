package com.verduttio.cinemaapp.controller.rest;

import com.verduttio.cinemaapp.entity.storage.StorageFileNotFoundException;
import com.verduttio.cinemaapp.service.storage.ImageStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@Controller
@RequestMapping(path="/files/images")
@CrossOrigin
public class ImageStorageController {

    private final ImageStorageService storageService;

    @Autowired
    public ImageStorageController(ImageStorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping("/{userId}")
    @ResponseBody
    @PreAuthorize("#userId == authentication.principal.id")
    public List<?> listUploadedFiles(@PathVariable String userId) {
        return storageService.loadAll(userId).map(
                path -> path.getFileName().toString()).toList();
    }

    @GetMapping("/public/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) throws IOException {
        Resource file = storageService.loadAsResourceFromPublic(filename);
        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(new InputStreamResource(file.getInputStream()));
    }

    @GetMapping("/{userId}/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename, @PathVariable String userId) throws IOException {
        Resource file = storageService.loadAsResourceFromHome(filename, userId);
        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(new InputStreamResource(file.getInputStream()));
    }

    @GetMapping("/{userId}/temp/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFileTemp(@PathVariable String filename, @PathVariable String userId) throws IOException {
        Resource file = storageService.loadAsResourceFromTemp(filename, userId);
        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(new InputStreamResource(file.getInputStream()));
    }

    @PostMapping
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file) {
        storageService.store(file);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{filename:.+}")
    public ResponseEntity<?> removeFile(@PathVariable String filename) {
        storageService.delete(filename);   // It takes the id of current user and remove the file from user's files
        ///We should change it to return object state based on the result of the deletion
        return ResponseEntity.ok().build();
    }


    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }

}
