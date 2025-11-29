package com.subho.trackscholar.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Subject {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @ManyToOne
    @JsonIgnoreProperties({"subjects", "students", "teachers"})
    private Classroom classroom;


    @ManyToOne
    @JsonIgnoreProperties("classrooms")
    private Teacher teacher;
}
