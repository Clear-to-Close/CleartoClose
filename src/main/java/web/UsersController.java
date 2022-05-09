package web;

import data.User;
import data.UsersRepository;
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

    @GetMapping
    public List<User> getAllUsers() {
        return usersRepository.findAll();
    }
    // Where was I going with this? Seems like an admin function
@GetMapping("{userId}")
    public Optional<User> getById(@PathVariable Long userId) {
    return usersRepository.findById(userId);
}

}
