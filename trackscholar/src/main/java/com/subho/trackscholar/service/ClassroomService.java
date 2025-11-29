package com.subho.trackscholar.service;

import com.subho.trackscholar.model.Classroom;
import com.subho.trackscholar.repo.ClassroomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClassroomService {
    @Autowired
    private ClassroomRepository classroomRepo;

    public Classroom addClassroom(Classroom classroom) {
        return classroomRepo.save(classroom);
    }

    public List<Classroom> getAll() {
        return classroomRepo.findAll();
    }

    public Optional<Classroom> getById(Long id) {
        return classroomRepo.findById(id);
    }
    public void deleteClassroom(Long id) {
        classroomRepo.deleteById(id);
    }
}
