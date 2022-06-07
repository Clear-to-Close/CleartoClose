package com.codeup.cleartoclose.services;


import com.codeup.cleartoclose.data.User;
import com.codeup.cleartoclose.data.UsersRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service("mailService")
@AllArgsConstructor
@NoArgsConstructor
public class MailService {

    private UsersRepository usersRepository;

    @Autowired
    public JavaMailSender emailSender;

    @Value("${spring.mail.from}")
    private String from;

    public void updateResetPasswordToken(String token, String email) {
        User user = usersRepository.findByEmail(email);
        user.setResetPasswordToken(token);
        usersRepository.save(user);
    }

    public User getByPasswordToken(String token) {
        return usersRepository.findByResetPasswordToken(token);
    }

    public void prepareAndSend(User user, String subject, String body) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(from);
        msg.setTo(user.getEmail());
        msg.setSubject(subject);
        msg.setText(body);

        try {
            this.emailSender.send(msg);
        } catch (MailException e) {
            System.out.println(e.getMessage());
        }
    }
}
