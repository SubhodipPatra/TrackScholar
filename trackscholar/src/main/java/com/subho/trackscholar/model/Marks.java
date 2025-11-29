package com.subho.trackscholar.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Marks {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties("classroom")
    private Student student;

    @ManyToOne
    @JsonIgnoreProperties("classroom")
    private Subject subject;

    private int marks;
    private int totalMarks;
    private LocalDate date;
    @Column(nullable = false)
    private String examName;
}
