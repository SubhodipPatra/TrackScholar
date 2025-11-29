package com.subho.trackscholar.repo;

import com.subho.trackscholar.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByStudentId(Long studentId);
    List<Attendance> findBySubjectIdAndDate(Long subjectId, LocalDate date);
    List<Attendance> findByStudentClassroomIdAndSubjectIdAndDate(Long classId, Long subjectId, LocalDate date);
    List<Attendance> findByStudentIdAndSubjectId(Long studentId, Long subjectId);

}

