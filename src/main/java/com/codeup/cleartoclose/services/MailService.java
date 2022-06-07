package com.codeup.cleartoclose.services;


import com.codeup.cleartoclose.data.User;
import com.codeup.cleartoclose.data.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service("mailService")
public class MailService {

    private final UsersRepository usersRepository;

    @Autowired
    public JavaMailSender emailSender;

    @Value("${spring.mail.from}")
    private String from;


    public MailService(UsersRepository usersRepository) {

        this.usersRepository = usersRepository;
    }

    public void updateResetPasswordToken(String token, String email) {
        System.out.println(email);
        if (usersRepository == null) {
            System.out.println("hello");
        }
        User user = usersRepository.findByEmail(email);
        user.setResetPasswordToken(token);
        System.out.println(user);
        usersRepository.save(user);
    }

    public User getByPasswordToken(String token) {
        return usersRepository.findByResetPasswordToken(token);
    }

    public void prepareAndSend(User user, String subject, String body) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(from);
        msg.setTo(user.getEmail());
        System.out.println(user.getEmail());
        msg.setSubject(subject);
        msg.setText(body);
        System.out.println(msg);

        try {
            this.emailSender.send(msg);
        } catch (MailException e) {
            System.out.println(e.getMessage());
        }
    }
}
