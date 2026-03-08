package com.resolveit.controller;

import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import com.resolveit.service.ComplaintService;
import com.resolveit.model.Complaint;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintController {

private final ComplaintService complaintService;

@PostMapping("/submit")
public Complaint submitComplaint(

@RequestParam String category,
@RequestParam String description,
@RequestParam String urgency,
@RequestParam boolean anonymous,
@RequestParam(required=false) MultipartFile file,
HttpServletRequest request

) throws IOException {

Complaint complaint = new Complaint();

complaint.setCategory(category);
complaint.setDescription(description);
complaint.setUrgency(urgency);
complaint.setAnonymous(anonymous);

if(file != null){
complaint.setAttachment(file.getOriginalFilename());
}

Long userId = null;

if(!anonymous){
userId = (Long) request.getAttribute("userId");
}

return complaintService.submitComplaint(complaint,userId);

}

@PostMapping("/assign")
public Complaint assignComplaint(
@RequestParam Long complaintId,
@RequestParam Long staffId){

return complaintService.assignComplaint(complaintId,staffId);

}

@PostMapping("/update-status")
public Complaint updateStatus(
@RequestParam Long complaintId,
@RequestParam String status){

return complaintService.updateStatus(complaintId,status);

}

@GetMapping("/all")
public List<Complaint> getAll(){

return complaintService.getAllComplaints();

}

}