package com.codeup.cleartoclose.web;

import com.codeup.cleartoclose.data.User;
import com.codeup.cleartoclose.data.UsersRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/users", headers = "Accept=application/json")
public class UsersController {

    private final UsersRepository usersRepository;

    public UsersController(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
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

    @PostMapping
    public void createUser(@RequestBody User newUser) {
        usersRepository.save(newUser);
    }

}
