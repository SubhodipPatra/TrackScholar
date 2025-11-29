package com.subho.trackscholar.service;

import com.subho.trackscholar.model.*;
import com.subho.trackscholar.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired private StudentRepository studentRepo;
    @Autowired private ClassroomRepository classroomRepo;
    @Autowired private AppUserRepository userRepo;
    @Autowired private AttendanceRepository attendanceRepo;
    @Autowired private MarksRepository marksRepo;

    public Student register(Student s, Long classId) {
        if (userRepo.findByEmail(s.getEmail()).isPresent()) {
            throw new RuntimeException("Email already used");
        }

        Classroom classroom = classroomRepo.findById(classId).orElseThrow();
        s.setClassroom(classroom);

        Student saved = studentRepo.save(s);

        AppUser user = new AppUser();
        user.setEmail(s.getEmail());
        user.setPassword(s.getPassword());
        user.setName(s.getName());
        user.setRole(Role.STUDENT);
        userRepo.save(user);

        return saved;
    }

    public List<Student> getAll() {
        return studentRepo.findAll();
    }

    public Student getProfile(String email) {
        return studentRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found with email: " + email));
    }

    public Map<String, Map<String, Long>> getAttendanceSummary(String email) {
        Student student = getProfile(email);
        List<Attendance> records = attendanceRepo.findByStudentId(student.getId());

        return records.stream()
                .collect(Collectors.groupingBy(
                        a -> a.getSubject().getName(),
                        Collectors.groupingBy(Attendance::getStatus, Collectors.counting())
                ));
    }
    public List<Student> getStudentsByClassId(Long classId) {
        return studentRepo.findByClassroomId(classId);
    }


    public Map<String, Map<String, Map<String, Object>>> getMarksSummary(String email) {
        Student student = getProfile(email);
        List<Marks> marksList = marksRepo.findByStudentId(student.getId());

        return marksList.stream()
                .collect(Collectors.groupingBy(
                        m -> m.getSubject().getName(), // Group by subject
                        Collectors.groupingBy(
                                Marks::getExamName,       // Then group by exam name
                                Collectors.collectingAndThen(
                                        Collectors.toList(),
                                        list -> {
                                            int total = list.stream().mapToInt(Marks::getTotalMarks).sum();
                                            int scored = list.stream().mapToInt(Marks::getMarks).sum();
                                            double percentage = total == 0 ? 0 : (scored * 100.0 / total);

                                            Map<String, Object> summary = new HashMap<>();
                                            summary.put("total", total);
                                            summary.put("scored", scored);
                                            summary.put("percentage", percentage);
                                            return summary;
                                        }
                                )
                        )
                ));
    }


    public Map<String, Integer> getAttendanceSummarybyid(String email, Long subjectId) {
        Student student = getProfile(email);

        List<Attendance> records = attendanceRepo.findByStudentIdAndSubjectId(student.getId(), subjectId);

        return records.stream()
                .collect(Collectors.groupingBy(
                        Attendance::getStatus,
                        Collectors.collectingAndThen(Collectors.counting(), Long::intValue)
                ));
    }

    public void deleteStudent(Long id) {
        studentRepo.deleteById(id);
    }

}
