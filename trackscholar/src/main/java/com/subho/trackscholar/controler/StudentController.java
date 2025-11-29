package com.subho.trackscholar.controler;

import com.subho.trackscholar.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired private StudentService studentService;

    @GetMapping("/me")
    public ResponseEntity<?> getProfile(Authentication auth) {
        return ResponseEntity.ok(studentService.getProfile(auth.getName()));
    }

    @GetMapping("/attendance-summary")
    public ResponseEntity<?> getAttendanceSummary(Authentication auth) {
        return ResponseEntity.ok(studentService.getAttendanceSummary(auth.getName()));
    }

    @GetMapping("/marks-summary")
    public ResponseEntity<?> getMarksSummary(Authentication auth) {
        return ResponseEntity.ok(studentService.getMarksSummary(auth.getName()));
    }

}
