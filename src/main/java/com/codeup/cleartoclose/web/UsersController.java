package com.codeup.cleartoclose.web;

import com.codeup.cleartoclose.data.*;
import com.codeup.cleartoclose.dto.UserDTO;
import com.codeup.cleartoclose.services.MailService;
import net.bytebuddy.utility.RandomString;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.JavaMailSender;
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
import java.util.Optional;

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
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(@RequestBody User newUser) {
        System.out.println(newUser.getPassword());
        newUser.setRole(User.Role.USER);
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        usersRepository.save(newUser);
    }


    @PutMapping("{userId}")
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
            addressToEdit.setAddress(userDTO.getCity());
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
        usersRepository.save(userToUpdate);

    }

    //Pulled from Raymonds Respository
    @PutMapping("updatePassword")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN') || (#currentPassword != null && !#currentPassword.isEmpty())")
    void updatePassword(@RequestParam String currentPassword, @Valid @Size(min = 3) @RequestParam String newPassword, OAuth2Authentication authUser
    ) {
        if (!currentPassword.equals(newPassword)) {
            User currentUser = usersRepository.findByEmail(authUser.getName());
            currentUser.setPassword(passwordEncoder.encode(newPassword));
            usersRepository.save(currentUser);
        }
    }
    public void sendEmail(String recipientEmail, String link)
            throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("cleartoclose.biz", "Did you forget your password?");
        helper.setTo(recipientEmail);
        String subject = "Password Reset";
        String content = "<html><p>Hello,</p><p>You have requested to reset your password.</p><p>Click the link below to change your password:</p><br><a href=\"" + link + "\">Change my password</a><br><p>Ignore this email if you do remember your password, or you have not made the request.</p></html>";
        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);
    }

    @PutMapping("/send")
    public void processForgotPassword(@RequestParam String email) throws MessagingException, UnsupportedEncodingException {
        System.out.println("send email backend reached:" + email);
        String token = RandomString.make(15);
        mailService.updateResetPasswordToken(token, email);
        String resetPasswordLink = "http://localhost:8080/reset_password?token=" + token;
        sendEmail(email, resetPasswordLink);
    }


    @PutMapping("/reset_password")
    public void resetPasswordFromToken(@RequestParam String password, @RequestParam String token) {
        User user = mailService.getByPasswordToken(token);
        System.out.println(user.getUsername());
        String encryptedPassword = passwordEncoder.encode(password);
        user.setPassword(encryptedPassword);
        user.setResetPasswordToken(null);
        usersRepository.save(user);
    }


}
