package com.resolveit.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.resolveit.model.Complaint;
import com.resolveit.repository.ComplaintRepository;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@CrossOrigin("*")

public class ReportController {

private final ComplaintRepository complaintRepository;

/* EXPORT CSV REPORT */

@GetMapping("/export")
public ResponseEntity<String> exportComplaints(){

List<Complaint> complaints = complaintRepository.findAll();

StringBuilder csv = new StringBuilder();

csv.append("ID,Category,Description,Urgency,Status,AssignedStaff,CreatedAt\n");

for(Complaint c : complaints){

csv.append(c.getId()).append(",")
.append(c.getCategory()).append(",")
.append(c.getDescription()).append(",")
.append(c.getUrgency()).append(",")
.append(c.getStatusType()).append(",")
.append(c.getAssignedStaffId()).append(",")
.append(c.getCreatedAt()).append("\n");

}

return ResponseEntity
.ok()
.header("Content-Disposition","attachment; filename=complaints_report.csv")
.body(csv.toString());

}

}