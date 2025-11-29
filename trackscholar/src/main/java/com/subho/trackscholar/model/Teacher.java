package com.subho.trackscholar.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role = Role.TEACHER;

    @ManyToMany
    @JoinTable(
            name = "teacher_classroom",
            joinColumns = @JoinColumn(name = "teacher_id"),
            inverseJoinColumns = @JoinColumn(name = "classroom_id")
    )
    @JsonIgnoreProperties({"teachers", "subjects", "students"})
    private List<Classroom> classrooms;
}
