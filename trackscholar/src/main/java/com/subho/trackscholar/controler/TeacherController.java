package com.subho.trackscholar.controler;

import com.subho.trackscholar.model.Student;
import com.subho.trackscholar.service.StudentService;
import com.subho.trackscholar.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/teacher")
public class TeacherController {

    @Autowired private TeacherService teacherService;
    @Autowired private StudentService studentService;

    @GetMapping("/me")
    public ResponseEntity<?> getTeacher(Authentication auth) {
        return ResponseEntity.ok(teacherService.getByEmail(auth.getName()));
    }

    @GetMapping("/subjects")
    public ResponseEntity<?> getSubjects(Authentication auth) {
        return ResponseEntity.ok(teacherService.getSubjectsByEmail(auth.getName()));
    }

    @GetMapping("/classrooms")
    public ResponseEntity<?> getClassrooms(Authentication auth) {
        return ResponseEntity.ok(teacherService.getClassrooms(auth.getName()));
    }

    @GetMapping("/students/{classId}")
    public ResponseEntity<?> getStudents(@PathVariable Long classId) {
        return ResponseEntity.ok(teacherService.getStudentsByClass(classId));
    }

    @PostMapping("/attendance")
    public ResponseEntity<?> markAttendance(@RequestBody Map<String, String> data) {
        return ResponseEntity.ok(teacherService.markAttendance(data));
    }


    @PostMapping("/marks")
    public ResponseEntity<?> assignMarks(@RequestBody Map<String, String> data, Authentication auth) {
        return ResponseEntity.ok(teacherService.assignMarks(auth.getName(), data));
    }

    @GetMapping("/attendance/{subjectId}/{date}")
    public ResponseEntity<?> getAttendance(@PathVariable Long subjectId, @PathVariable String date) {
        return ResponseEntity.ok(teacherService.getAttendanceBySubjectAndDate(subjectId, date));
    }

    @GetMapping("/attendance")
    public ResponseEntity<?> getAttendanceByClassSubjectDate(
            @RequestParam Long classId,
            @RequestParam Long subjectId,
            @RequestParam String date
    ) {
        return ResponseEntity.ok(teacherService.getAttendanceByClassSubjectDate(classId, subjectId, date));
    }

    @GetMapping("/marks")
    public ResponseEntity<?> getMarks(
            @RequestParam Long classId,
            @RequestParam Long subjectId,
            @RequestParam String examType,
            Authentication auth
    ) {
        return ResponseEntity.ok(teacherService.getMarks(auth.getName(), classId, subjectId, examType));
    }

    @GetMapping("/attendance-summary/class/{classId}/subject/{subjectId}")
    public ResponseEntity<?> getClassAttendanceSummaryBySubject(
            @PathVariable Long classId,
            @PathVariable Long subjectId) {
        List<Student> students = studentService.getStudentsByClassId(classId);

        List<Map<String, Object>> summaries = students.stream()
                .map(student -> {
                    Map<String, Object> studentSummary = new HashMap<>();
                    studentSummary.put("studentId", student.getId());
                    studentSummary.put("name", student.getName());
                    studentSummary.put("email", student.getEmail());
                    studentSummary.put("attendance", studentService.getAttendanceSummarybyid(student.getEmail(),subjectId));
                    return studentSummary;
                }).toList();

        return ResponseEntity.ok(summaries);
    }




    @PutMapping("/marks/{markId}")
    public ResponseEntity<?> updateMarks(@PathVariable Long markId, @RequestBody Map<String, String> data, Authentication auth) {
        return ResponseEntity.ok(teacherService.updateMarks(auth.getName(), markId, data));
    }

    @DeleteMapping("/marks/{markId}")
    public ResponseEntity<?> deleteMarks(@PathVariable Long markId, Authentication auth) {
        return ResponseEntity.ok(teacherService.deleteMarks(auth.getName(), markId));
    }
}
