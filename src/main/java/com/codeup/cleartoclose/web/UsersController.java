package com.codeup.cleartoclose.web;

import com.codeup.cleartoclose.data.Address;
import com.codeup.cleartoclose.data.AddressRepository;
import com.codeup.cleartoclose.data.User;
import com.codeup.cleartoclose.data.UsersRepository;
import com.codeup.cleartoclose.dto.UserDTO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/users", headers = "Accept=application/json")
public class UsersController {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final AddressRepository addressRepository;

    public UsersController(UsersRepository usersRepository, PasswordEncoder passwordEncoder, AddressRepository addressRepository) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
        this.addressRepository = addressRepository;
    }

    @GetMapping("searchByEmail")
    public User findUserEmail(@RequestParam String email) {
        return usersRepository.findByEmail(email);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return usersRepository.findAll();
    }

    // Where was I going with this? Seems like an admin function
    @GetMapping("{userId}")
    public Optional<User> getById(@PathVariable Long userId) {
        return usersRepository.findById(userId);
    }

    @PostMapping("create")
    public void createUser(@RequestBody User newUser) {
        System.out.println(newUser.getPassword());
        newUser.setRole(User.Role.USER);
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        usersRepository.save(newUser);
    }


    @PutMapping("{userId}")
    private void updateUser(@PathVariable Long userId, @RequestBody UserDTO userDTO) {
        System.out.println("made it to backend of update");
        User  userToUpdate = usersRepository.findById(userId).get();
        userToUpdate.setPassword(userDTO.getPassword());
        userToUpdate.setEmail(userDTO.getEmail());
        userToUpdate.setFirstName(userDTO.getFirstName());
        userToUpdate.setLastName(userDTO.getLastName());
        userToUpdate.setPhoneNumber(userToUpdate.getPhoneNumber());
        System.out.println(userToUpdate);
        Address addressToEdit = addressRepository.findById(userToUpdate.getUserAddress().getId()).get();
        System.out.println(addressToEdit);
        addressToEdit.setAddress(userDTO.getAddress());
        addressToEdit.setCity(userDTO.getCity());
        addressToEdit.setState(userDTO.getState());
        addressToEdit.setApartmentNumber(userDTO.getApartmentNumber());
        addressToEdit.setZipCode(userDTO.getZipCode());
        System.out.println(addressToEdit);
        System.out.println(userToUpdate);
        usersRepository.save(userToUpdate);

    }

//    @RequestMapping(value = "/heavyresource/{id}", method = RequestMethod.PATCH, consumes = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<?> partialUpdateGeneric(
//            @RequestBody Map<String, Object> updates,
//            @PathVariable("id") String id) {
//
//        System.out.println(updates);
//
////        heavyResourceRepository.save(updates, id);
//        return ResponseEntity.ok("resource updated");
//    }




}
