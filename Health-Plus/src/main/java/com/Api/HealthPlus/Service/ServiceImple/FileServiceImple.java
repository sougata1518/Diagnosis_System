package com.Api.HealthPlus.Service.ServiceImple;

import com.Api.HealthPlus.Service.FileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileServiceImple implements FileService {
    @Override
    public String uploadImage(String path, MultipartFile file) throws IOException {
        // File name
        String name=file.getOriginalFilename();

        //random name generate file
        String randomID = UUID.randomUUID().toString();
        String fileName = randomID.concat(name.substring(name.lastIndexOf(".")));

        //Fullpath
        String filePath = path + File.separator + fileName;

        //create folder if not created
        File f = new File(path);
        if(!f.exists()){
            f.mkdir();
        }

        //file copy
        Files.copy(file.getInputStream(), Paths.get(filePath));
        return fileName;
    }

    @Override
    public InputStream getResource(String path, String filename) throws FileNotFoundException {
        String fullPath = path + File.separator + filename;
        InputStream is = new FileInputStream(fullPath);
        return is;
    }
}
