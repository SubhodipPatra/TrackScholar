package com.subho.trackscholar.service;

import com.subho.trackscholar.model.*;
import com.subho.trackscholar.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class TeacherService {

    @Autowired private TeacherRepository teacherRepo;
    @Autowired private SubjectRepository subjectRepo;
    @Autowired private StudentRepository studentRepo;
    @Autowired private AttendanceRepository attendanceRepo;
    @Autowired private MarksRepository marksRepo;
    @Autowired private ClassroomRepository classroomRepo;
    @Autowired private AppUserRepository userRepo;

    public Teacher register(Teacher t) {
        if (userRepo.findByEmail(t.getEmail()).isPresent()) {
            throw new RuntimeException("Email already used");
        }

        Teacher saved = teacherRepo.save(t);

        AppUser user = new AppUser();
        user.setEmail(t.getEmail());
        user.setPassword(t.getPassword());
        user.setName(t.getName());
        user.setRole(Role.TEACHER);
        userRepo.save(user);

        return saved;
    }

    public Teacher getByEmail(String email) {
        return teacherRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("Teacher not found"));
    }

    public List<Subject> getSubjectsByEmail(String email) {
        Teacher teacher = getByEmail(email);
        return subjectRepo.findByTeacherId(teacher.getId());
    }

    public List<Classroom> getClassrooms(String email) {
        return getByEmail(email).getClassrooms();
    }

    public List<Student> getStudentsByClass(Long classId) {
        return studentRepo.findByClassroomId(classId);
    }

    public Attendance markAttendance(Map<String, String> data) {
        Attendance a = new Attendance();
        a.setStudent(studentRepo.findById(Long.parseLong(data.get("studentId"))).orElseThrow());
        a.setSubject(subjectRepo.findById(Long.parseLong(data.get("subjectId"))).orElseThrow());
        a.setDate(LocalDate.now());
        a.setStatus(data.get("status"));
        return attendanceRepo.save(a);
    }


    public Marks assignMarks(String teacherEmail, Map<String, String> data) {
        Teacher teacher = getByEmail(teacherEmail);

        Marks m = new Marks();
        m.setStudent(studentRepo.findById(Long.parseLong(data.get("studentId"))).orElseThrow());
        m.setSubject(subjectRepo.findById(Long.parseLong(data.get("subjectId"))).orElseThrow());
        m.setDate(LocalDate.now());

        m.setMarks(Integer.parseInt(data.get("marks")));
        m.setTotalMarks(Integer.parseInt(data.get("totalMarks")));

        String examType = data.get("examType");
        if (examType == null || examType.isBlank()) {
            throw new RuntimeException("Exam type is required");
        }
        m.setExamName(examType.toUpperCase());

        return marksRepo.save(m);
    }


    public List<Attendance> getAttendanceBySubjectAndDate(Long subjectId, String date) {
        LocalDate parsedDate = LocalDate.parse(date);
        return attendanceRepo.findBySubjectIdAndDate(subjectId, parsedDate); //


    }

    public List<Attendance> getAttendanceByClassSubjectDate(Long classId, Long subjectId, String date) {
        return attendanceRepo.findByStudentClassroomIdAndSubjectIdAndDate(classId, subjectId, LocalDate.parse(date));
    }


    public List<Marks> getMarks(String teacherEmail, Long classId, Long subjectId, String examType) {
        Teacher teacher = getByEmail(teacherEmail);

        return marksRepo.findAll().stream()
                .filter(m ->
                        m.getSubject().getId().equals(subjectId) &&
                                m.getSubject().getClassroom().getId().equals(classId) &&
                                m.getSubject().getTeacher().getId().equals(teacher.getId()) &&
                                examType.equalsIgnoreCase(m.getExamName())
                ).toList();
    }


    public Map<String, Object> getClassAttendanceSummaryWithTotals(String email, Long classId) {
        Teacher teacher = getByEmail(email);
        List<Long> subjectIds = subjectRepo.findByTeacherId(teacher.getId()).stream()
                .filter(s -> s.getClassroom().getId().equals(classId))
                .map(Subject::getId)
                .toList();

        List<Student> students = studentRepo.findByClassroomId(classId);
        List<Map<String, Object>> summaryList = new ArrayList<>();
        long totalPresent = 0;
        long totalAbsent = 0;

        for (Student s : students) {
            List<Attendance> records = attendanceRepo.findByStudentId(s.getId()).stream()
                    .filter(a -> subjectIds.contains(a.getSubject().getId()))
                    .toList();
            long present = records.stream().filter(a -> "PRESENT".equalsIgnoreCase(a.getStatus())).count();
            long absent = records.stream().filter(a -> "ABSENT".equalsIgnoreCase(a.getStatus())).count();
            totalPresent += present;
            totalAbsent += absent;

            Map<String, Object> summary = new HashMap<>();
            summary.put("studentId", s.getId());
            summary.put("studentName", s.getName());
            summary.put("email", s.getEmail());
            summary.put("present", present);
            summary.put("absent", absent);
            summaryList.add(summary);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("summary", summaryList);
        response.put("totalPresent", totalPresent);
        response.put("totalAbsent", totalAbsent);
        return response;
    }


    public Object updateMarks(String email, Long markId, Map<String, String> data) {
        Teacher teacher = getByEmail(email);
        Marks mark = marksRepo.findById(markId).orElseThrow(() -> new RuntimeException("Marks not found"));
        if (!mark.getSubject().getTeacher().getId().equals(teacher.getId())) {
            return ResponseEntity.status(403).body("Not authorized");
        }

        mark.setMarks(Integer.parseInt(data.get("marks")));
        mark.setTotalMarks(Integer.parseInt(data.get("totalMarks")));

        if (data.containsKey("examType")) {
            mark.setExamName(data.get("examType").toUpperCase());
        }

        return marksRepo.save(mark);
    }

    public Object deleteMarks(String email, Long markId) {
        Teacher teacher = getByEmail(email);
        Marks mark = marksRepo.findById(markId).orElseThrow(() -> new RuntimeException("Marks not found"));
        if (!mark.getSubject().getTeacher().getId().equals(teacher.getId())) {
            return ResponseEntity.status(403).body("Not authorized");
        }
        marksRepo.deleteById(markId);
        return "Deleted";
    }
    public void assignClassroom(Long teacherId, Long classId) {
        Teacher teacher = teacherRepo.findById(teacherId).orElseThrow();
        Classroom classroom = classroomRepo.findById(classId).orElseThrow();

        teacher.getClassrooms().add(classroom);
        teacherRepo.save(teacher);
    }
    public List<Teacher> getAll() {
        return teacherRepo.findAll();
    }
    public void deleteTeacher(Long id) {
        teacherRepo.deleteById(id);
    }


}
