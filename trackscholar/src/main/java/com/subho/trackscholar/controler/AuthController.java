package com.subho.trackscholar.controler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.subho.trackscholar.model.AppUser;
import com.subho.trackscholar.repo.AppUserRepository;
import com.subho.trackscholar.service.AppUserService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AppUserRepository repo;


    @Autowired
    private AppUserService userService;





    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AppUser user) {
        AppUser saved = userService.register(user);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe(Authentication auth) {
        String email = auth.getName();
        AppUser user = repo.findByEmail(email).orElseThrow(); 
        return ResponseEntity.ok(user); 
    }

}

