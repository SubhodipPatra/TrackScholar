package com.subho.trackscholar.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Attendance {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties("classroom")
    private Student student;

    @ManyToOne
    @JsonIgnoreProperties("classroom")
    private Subject subject;

    private LocalDate date;
    private String status;
}
