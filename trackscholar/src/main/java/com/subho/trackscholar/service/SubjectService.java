package com.subho.trackscholar.service;

import com.subho.trackscholar.model.Classroom;
import com.subho.trackscholar.model.Subject;
import com.subho.trackscholar.model.Teacher;
import com.subho.trackscholar.repo.ClassroomRepository;
import com.subho.trackscholar.repo.SubjectRepository;
import com.subho.trackscholar.repo.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {
    @Autowired
    private SubjectRepository subjectRepo;

    @Autowired
    private ClassroomRepository classroomRepo;

    @Autowired
    private TeacherRepository teacherRepo;

    public Subject addSubject(String name, Long classId, Long teacherId) {
        Classroom classroom = classroomRepo.findById(classId).orElseThrow();
        Teacher teacher = teacherRepo.findById(teacherId).orElseThrow();

        Subject subject = new Subject();
        subject.setName(name);
        subject.setClassroom(classroom);
        subject.setTeacher(teacher);

        return subjectRepo.save(subject);
    }

    public List<Subject> getAll() {
        return subjectRepo.findAll();
    }
    public void deleteSubject(Long id) {
        subjectRepo.deleteById(id);
    }

}
