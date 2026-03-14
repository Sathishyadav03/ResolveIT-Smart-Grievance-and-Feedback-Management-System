package com.resolveit.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.resolveit.model.Complaint;
import com.resolveit.service.ComplaintService;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ComplaintController {

private final ComplaintService complaintService;

/* SUBMIT COMPLAINT WITH ATTACHMENT */

@PostMapping("/submit")
public Complaint submitComplaint(

@RequestParam("category") String category,
@RequestParam("description") String description,
@RequestParam("urgency") String urgency,
@RequestParam("anonymous") boolean anonymous,
@RequestParam(value="file",required=false) MultipartFile file

) throws IOException{

Complaint complaint = new Complaint();

complaint.setAnonymous(anonymous);
complaint.setCategory(category);
complaint.setDescription(description);
complaint.setUrgency(urgency);

/* GET USER FROM JWT */

String principal = SecurityContextHolder
.getContext()
.getAuthentication()
.getPrincipal()
.toString();

Long userId = Long.parseLong(principal);

complaint.setUserId(userId);

/* SAVE FILE */

if(file!=null && !file.isEmpty()){

String uploadDir = "uploads/";

File dir = new File(uploadDir);

if(!dir.exists()){
dir.mkdirs();
}

String fileName = System.currentTimeMillis()+"_"+file.getOriginalFilename();

Path filePath = Paths.get(uploadDir + fileName);

Files.write(filePath,file.getBytes());

complaint.setAttachment(fileName);

}

return complaintService.submitComplaint(complaint);

}

/* GET ALL COMPLAINTS */

@GetMapping("/all")
public List<Complaint> getAllComplaints(){

return complaintService.getAllComplaints();

}

/* USER COMPLAINTS */

@GetMapping("/my")
public List<Complaint> getMyComplaints(){

Long userId = Long.parseLong(

SecurityContextHolder
.getContext()
.getAuthentication()
.getPrincipal()
.toString()

);

return complaintService.getComplaintsByUser(userId);

}

/* STAFF COMPLAINTS */

@GetMapping("/staff")
public List<Complaint> getStaffComplaints(){

Long staffId = Long.parseLong(

SecurityContextHolder
.getContext()
.getAuthentication()
.getPrincipal()
.toString()

);

return complaintService.getComplaintsByStaff(staffId);

}

/* GET SINGLE COMPLAINT */

@GetMapping("/{id}")
public Complaint getComplaintById(@PathVariable Long id){

return complaintService.getComplaintById(id);

}

/* UPDATE STATUS */

@PutMapping("/update-status/{id}")
public Complaint updateStatus(
@PathVariable Long id,
@RequestParam String status){

return complaintService.updateStatus(id,status);

}

/* ASSIGN STAFF */

@PostMapping("/assign")
public Complaint assignComplaint(
@RequestParam Long complaintId,
@RequestParam Long staffId){

return complaintService.assignComplaint(complaintId,staffId);

}

}