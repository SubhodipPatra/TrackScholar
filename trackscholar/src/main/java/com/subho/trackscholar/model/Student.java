package com.subho.trackscholar.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    @Id
    //@GeneratedValue
    private Long id;

    private String name;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role = Role.STUDENT;

    @ManyToOne
    @JsonIgnoreProperties({"subjects", "students", "teachers"})
    private Classroom classroom;
}
