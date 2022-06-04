package com.codeup.cleartoclose.services;


import com.codeup.cleartoclose.data.User;
import com.codeup.cleartoclose.data.UsersRepository;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service("mailService")
@AllArgsConstructor
public class MailService {

    private UsersRepository usersRepository;
    @Autowired
    public JavaMailSender emailSender;


    public void updateResetPasswordToken(String token, String email) {
        User user = usersRepository.findByEmail(email);
        user.setResetPasswordToken(token);
        usersRepository.save(user);
    }

    public User getByPasswordToken(String token) {
        return usersRepository.findByResetPasswordToken(token);
    }


}
