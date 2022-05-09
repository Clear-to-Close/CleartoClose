package web;

import data.Listing;
import data.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/users", headers = "Accept=application/json")
public class UsersController {

    // Where was I going with this? Seems like an admin function
@GetMapping("{userId}")
    public Optional<User> getById(@PathVariable Long userId) {
    return null;
}

}
