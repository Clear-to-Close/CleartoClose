package com.codeup.cleartoclose.web;

import com.codeup.cleartoclose.data.ListingsRepository;
import com.codeup.cleartoclose.data.User;
import com.codeup.cleartoclose.data.UsersRepository;
import com.codeup.cleartoclose.services.S3Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/s3", headers = "Accept=application/json")
public class S3Controller {

    private final S3Service s3Service;
    private final UsersRepository usersRepository;
    private final ListingsRepository listingsRepository;

    public S3Controller(S3Service s3Service, UsersRepository usersRepository, ListingsRepository listingsRepository) {
        this.s3Service = s3Service;
        this.usersRepository = usersRepository;
        this.listingsRepository = listingsRepository;
    }

    @PostMapping("/uploadPreApproval/{userId}")
    public ResponseEntity<String> uploadPreApproval(@RequestParam(value = "file") MultipartFile upload, @PathVariable long userId) {
        String filename = null;
        try {
            filename = s3Service.uploadFile(upload);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
        User editUser = usersRepository.getById(userId);
        editUser.setPreApprovalileName(filename);
        usersRepository.save(editUser);

        return new ResponseEntity<>(filename, HttpStatus.OK);
    }

    @PostMapping("/uploadListingImg/{listingId}")
    public ResponseEntity<String> uploadListingImg(@RequestParam(value = "file") MultipartFile upload, @PathVariable long listingId) {
        String filename = s3Service.uploadFile(upload);
        System.out.println(filename);
//        Listing listingToEdit = listingsRepository.findById(userId).get();
//        listingToEdit.setPreApprovalileName(filename);
//        usersRepository.save(editUser);

        return new ResponseEntity<>(filename, HttpStatus.OK);
    }
}
