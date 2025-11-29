package com.subho.trackscholar.controler;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.subho.trackscholar.model.Classroom;
import com.subho.trackscholar.model.Student;
import com.subho.trackscholar.model.Teacher;
import com.subho.trackscholar.repo.AttendanceRepository;
import com.subho.trackscholar.repo.MarksRepository;
import com.subho.trackscholar.service.AppUserService;
import com.subho.trackscholar.service.ClassroomService;
import com.subho.trackscholar.service.StudentService;
import com.subho.trackscholar.service.SubjectService;
import com.subho.trackscholar.service.TeacherService;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired private ClassroomService classroomService;
    @Autowired private SubjectService subjectService;
    @Autowired private TeacherService teacherService;
    @Autowired private StudentService studentService;
    @Autowired private AttendanceRepository attendanceRepo;
    @Autowired private MarksRepository marksRepo;
    @Autowired private AppUserService service;

    //  Add Classroom
    @PostMapping("/classroom")
    public ResponseEntity<?> addClassroom(@RequestBody Classroom classroom) {
        return ResponseEntity.ok(classroomService.addClassroom(classroom));
    }

    //  Add Subject (with class and teacher IDs)
    @PostMapping("/subject")
    public ResponseEntity<?> addSubject(@RequestBody Map<String, String> body) {
        String name = body.get("name");
        Long classId = Long.parseLong(body.get("classId"));
        Long teacherId = Long.parseLong(body.get("teacherId"));
        return ResponseEntity.ok(subjectService.addSubject(name, classId, teacherId));
    }

    //  Register Teacher
    @PostMapping("/teacher")
    public ResponseEntity<?> registerTeacher(@RequestBody Teacher t) {
        return ResponseEntity.ok(teacherService.register(t));
    }

    //  Register Student
    @PostMapping("/student/{classId}")
    public ResponseEntity<?> registerStudent(@RequestBody Student s, @PathVariable Long classId) {
        return ResponseEntity.ok(studentService.register(s, classId));
    }

    
    @GetMapping("/classrooms")
    public ResponseEntity<?> getAllClassrooms() {
        return ResponseEntity.ok(classroomService.getAll());
    }

    //  View all students
    @GetMapping("/students")
    public ResponseEntity<?> getAllStudents() {
        return ResponseEntity.ok(studentService.getAll());
    }

    //  View all subjects
    @GetMapping("/subjects")
    public ResponseEntity<?> getAllSubjects() {
        return ResponseEntity.ok(subjectService.getAll());
    }

    //  View all teachers
    @GetMapping("/teachers")
    public ResponseEntity<?> getAllTeachers() {
        return ResponseEntity.ok(teacherService.getAll());
    }


    // View all attendance
    @GetMapping("/attendance")
    public ResponseEntity<?> getAllAttendance() {
        return ResponseEntity.ok(attendanceRepo.findAll());
    }

    //  View all marks
    @GetMapping("/marks")
    public ResponseEntity<?> getAllMarks() {
        return ResponseEntity.ok(marksRepo.findAll());
    }

    // Delete teacher
    @DeleteMapping("/teacher/{id}")
    public ResponseEntity<?> deleteTeacher(@PathVariable Long id) {
        teacherService.deleteTeacher(id);
        return ResponseEntity.ok("Teacher deleted successfully");
    }

    // Delete subject
    @DeleteMapping("/subject/{id}")
    public ResponseEntity<?> deleteSubject(@PathVariable Long id) {
        subjectService.deleteSubject(id);
        return ResponseEntity.ok("Subject deleted successfully");
    }

    // Delete student
    @DeleteMapping("/student/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok("Student deleted successfully");
    }

    // Delete classroom
    @DeleteMapping("/classroom/{id}")
    public ResponseEntity<?> deleteClassroom(@PathVariable Long id) {
        classroomService.deleteClassroom(id);
        return ResponseEntity.ok("Classroom deleted successfully");
    }
    @GetMapping("/me")
    public ResponseEntity<?> getAdmin(Authentication auth) {
        return service.find(auth.getName())
                .<ResponseEntity<?>>map(user -> ResponseEntity.ok(user))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin not found"));
    }


}
