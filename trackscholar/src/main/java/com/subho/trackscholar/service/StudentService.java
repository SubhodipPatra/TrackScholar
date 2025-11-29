package com.subho.trackscholar.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.subho.trackscholar.model.AppUser;
import com.subho.trackscholar.model.Attendance;
import com.subho.trackscholar.model.Classroom;
import com.subho.trackscholar.model.Marks;
import com.subho.trackscholar.model.Role;
import com.subho.trackscholar.model.Student;
import com.subho.trackscholar.repo.AppUserRepository;
import com.subho.trackscholar.repo.AttendanceRepository;
import com.subho.trackscholar.repo.ClassroomRepository;
import com.subho.trackscholar.repo.MarksRepository;
import com.subho.trackscholar.repo.StudentRepository;

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
                        m -> m.getSubject().getName(), 
                        Collectors.groupingBy(
                                Marks::getExamName,    
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
