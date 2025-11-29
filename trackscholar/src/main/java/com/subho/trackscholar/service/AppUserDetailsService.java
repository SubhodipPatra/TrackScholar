package com.subho.trackscholar.service;


import com.subho.trackscholar.model.AppUser;
import com.subho.trackscholar.repo.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class AppUserDetailsService implements UserDetailsService {
    @Autowired
    private AppUserRepository repo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AppUser user = repo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Not found: " + email));

        return User.withUsername(user.getEmail())
                .password(user.getPassword()) // removed {noop}
                .roles(user.getRole().name())
                .build();
    }



}


