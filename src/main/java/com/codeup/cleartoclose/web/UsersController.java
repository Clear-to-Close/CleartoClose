package com.codeup.cleartoclose.web;

import com.codeup.cleartoclose.data.Address;
import com.codeup.cleartoclose.data.AddressRepository;
import com.codeup.cleartoclose.data.User;
import com.codeup.cleartoclose.data.UsersRepository;
import com.codeup.cleartoclose.dto.UserDTO;
import com.codeup.cleartoclose.services.S3Service;
import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/users", headers = "Accept=application/json")
public class UsersController {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final AddressRepository addressRepository;
    private final S3Service s3Service;

    public UsersController(UsersRepository usersRepository, PasswordEncoder passwordEncoder, AddressRepository addressRepository, S3Service s3Service) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
        this.addressRepository = addressRepository;
        this.s3Service = s3Service;
    }

    @GetMapping("searchByEmail")
    public MappingJacksonValue getUserByEmail(@RequestParam String email) {
        SimpleBeanPropertyFilter filter = SimpleBeanPropertyFilter.serializeAllExcept("user");

        FilterProvider filterProvider = new SimpleFilterProvider().addFilter("addressFilter", filter);

        User user = usersRepository.findByEmail(email);
        user.setPreApprovalileName(s3Service.getSignedURL(user.getPreApprovalileName()));
        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(user);
        mappingJacksonValue.setFilters(filterProvider);

        return mappingJacksonValue;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return usersRepository.findAll();
    }

    @GetMapping("{userId}")
    public MappingJacksonValue getUserByEmail(@PathVariable Long userId) {
        SimpleBeanPropertyFilter filter = SimpleBeanPropertyFilter.serializeAllExcept("user");

        FilterProvider filterProvider = new SimpleFilterProvider().addFilter("addressFilter", filter);

        User user = usersRepository.findById(userId).get();
        user.setPreApprovalileName(s3Service.getSignedURL(user.getPreApprovalileName()));
        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(user);
        mappingJacksonValue.setFilters(filterProvider);

        return mappingJacksonValue;
    }

    @PostMapping("create")
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(@RequestBody User newUser) {
        System.out.println(newUser.getPassword());
        newUser.setRole(User.Role.USER);
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        usersRepository.save(newUser);
    }


    @PutMapping("editUser/{userId}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    private void updateUser(@PathVariable Long userId, @RequestBody UserDTO userDTO) {

        User  userToUpdate = usersRepository.findById(userId).get();
        if(userDTO.getPassword() == null){
            userToUpdate.setPassword(userToUpdate.getPassword());
        }

         if(userDTO.getEmail() != null) {
             userToUpdate.setEmail(userDTO.getEmail());
         }
         if (userDTO.getFirstName() != null){
             userToUpdate.setFirstName(userDTO.getFirstName());
        }
        if (userDTO.getLastName() != null){
            userToUpdate.setLastName(userDTO.getLastName());
        }
        if (userDTO.getPhoneNumber() != null){
            userToUpdate.setPhoneNumber(userDTO.getPhoneNumber());
        }
        Address addressToEdit = addressRepository.findById(userToUpdate.getUserAddress().getId()).get();

        if(userDTO.getAddress() != null){
            addressToEdit.setAddress(userDTO.getAddress());
        }
        if(userDTO.getCity() != null){
            addressToEdit.setCity(userDTO.getCity());
        }
        if(userDTO.getState() != null){
            addressToEdit.setState(userDTO.getState());
        }
        if(userDTO.getZipCode() != null){
            addressToEdit.setZipCode(userDTO.getZipCode());
        }
        if(userDTO.getApartmentNumber() != null){
            addressToEdit.setApartmentNumber(userDTO.getApartmentNumber());
        }
        userToUpdate.setUserAddress(addressToEdit);
        usersRepository.save(userToUpdate);
    }
}
