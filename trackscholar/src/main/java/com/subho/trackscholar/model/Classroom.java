package com.subho.trackscholar.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Classroom {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @OneToMany(mappedBy = "classroom", cascade = CascadeType.ALL)
    private List<Subject> subjects;

    @OneToMany(mappedBy = "classroom", cascade = CascadeType.ALL)
    private List<Student> students;

    @ManyToMany(mappedBy = "classrooms")
    private Set<Teacher> teachers = new HashSet<>();
}
