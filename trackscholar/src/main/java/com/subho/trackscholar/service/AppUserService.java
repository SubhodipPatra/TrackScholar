package com.subho.trackscholar.service;

import com.subho.trackscholar.model.AppUser;
import com.subho.trackscholar.model.Role;
import com.subho.trackscholar.model.Student;
import com.subho.trackscholar.repo.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AppUserService {
    @Autowired
    private AppUserRepository repo;

    public AppUser register(AppUser user) {
        if (repo.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already used");
        }
        return repo.save(user);
    }

    public Optional<AppUser> findByEmail(String email) {
        return repo.findByEmail(email);
    }

    public void createUserForStudent(Student s) {
        AppUser user = new AppUser();
        user.setEmail(s.getEmail());
        user.setPassword(s.getPassword()); // plain for now
        user.setName(s.getName());
        user.setRole(Role.STUDENT);
        repo.save(user);
    }

    public Optional<AppUser> find(String email) {
        return repo.findByEmail(email);
    }
}

