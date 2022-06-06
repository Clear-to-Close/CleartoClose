package com.codeup.cleartoclose.web;

import com.amazonaws.services.dynamodbv2.xspec.S;
import com.codeup.cleartoclose.data.*;
import com.codeup.cleartoclose.dto.UserDTO;
import com.codeup.cleartoclose.services.MailService;
import net.bytebuddy.utility.RandomString;
import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.validation.Valid;
import javax.validation.constraints.Size;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.UUID;


@CrossOrigin
@RestController
@RequestMapping(value = "/api/users", headers = "Accept=application/json")
public class UsersController {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final AddressRepository addressRepository;
    private final JavaMailSender mailSender;
    private final MailService mailService;

    public UsersController(UsersRepository usersRepository, PasswordEncoder passwordEncoder, AddressRepository addressRepository, JavaMailSender mailSender, MailService mailService) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
        this.addressRepository = addressRepository;
        this.mailSender = mailSender;
        this.mailService = mailService;
    }

    @GetMapping("searchByEmail")
    public MappingJacksonValue getUserByEmail(@RequestParam String email) {
        SimpleBeanPropertyFilter filter = SimpleBeanPropertyFilter.serializeAllExcept("user");

        FilterProvider filterProvider = new SimpleFilterProvider().addFilter("addressFilter", filter);

        User user = usersRepository.findByEmail(email);
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

    public void sendResetLinkToEmail(String usersRegisteredEmail, String resetLink)
            throws MessagingException, UnsupportedEncodingException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("teamcleartoclose.biz", "Did you forget your password?");
        helper.setTo(usersRegisteredEmail);
        String subject = "Password Reset";
        String content = "<html><p>Hello,</p><p>Click the link below to change your password:</p><br><a href=\"" + resetLink + "\">Change my password</a></html>";
        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);
    }

    @PutMapping("/send")
    public void forgotMyPassword(@RequestParam String userEmail)
            throws MessagingException, UnsupportedEncodingException {
        System.out.println(userEmail.getClass());

        System.out.println("send email backend reached:" + userEmail);
        String token = UUID.randomUUID().toString();;
        mailService.updateResetPasswordToken(token, userEmail);
        String resetPasswordLink = "http://localhost:8080/api/users/reset-password?token=" + token;
        sendResetLinkToEmail(userEmail, resetPasswordLink);
    }

    @PutMapping("/reset-password")
    public void resetUserPasswordFromToken(@RequestParam String password, @RequestParam String token) {
        User user = mailService.getByPasswordToken(token);
        System.out.println(user.getUsername());
        String encryptedPassword = passwordEncoder.encode(password);
        user.setPassword(encryptedPassword);
        user.setResetPasswordToken(null);
        usersRepository.save(user);
    }
        ///SWIPED FROM RAYMONDS GITHUB
    @PutMapping("update_password")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN') || (#currentPassword != null && !#currentPassword.isEmpty())")
    void updatePassword(@RequestParam String currentPassword, @RequestParam String newPassword, OAuth2Authentication authUser
    ) {
        if (!currentPassword.equals(newPassword)) {
            User currentUser = usersRepository.findByEmail(authUser.getName());
            currentUser.setPassword(passwordEncoder.encode(newPassword));
            usersRepository.save(currentUser);
        }
    }





}///END OF CLASS

