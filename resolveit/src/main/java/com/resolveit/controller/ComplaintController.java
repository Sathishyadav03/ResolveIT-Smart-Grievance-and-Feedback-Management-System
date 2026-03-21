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

/* SUBMIT COMPLAINT */

@PostMapping("/submit")
public Complaint submitComplaint(

@RequestParam String category,
@RequestParam String description,
@RequestParam String urgency,
@RequestParam boolean anonymous,
@RequestParam(required=false) MultipartFile file

) throws IOException{

Complaint complaint = new Complaint();

complaint.setAnonymous(anonymous);
complaint.setCategory(category);
complaint.setDescription(description);
complaint.setUrgency(urgency);

/* GET USER ID FROM JWT */

Long userId = (Long) SecurityContextHolder
        .getContext()
        .getAuthentication()
        .getPrincipal();

complaint.setUserId(userId);

/* FILE UPLOAD */

if(file!=null && !file.isEmpty()){

String uploadDir="uploads/";

File dir=new File(uploadDir);

if(!dir.exists()){
dir.mkdirs();
}

String fileName=System.currentTimeMillis()+"_"+file.getOriginalFilename();

Path path=Paths.get(uploadDir+fileName);

Files.write(path,file.getBytes());

complaint.setAttachment(fileName);

}

return complaintService.submitComplaint(complaint);

}

/* GET ALL COMPLAINTS */

@GetMapping("/all")
public List<Complaint> getAll(){

return complaintService.getAllComplaints();

}

/* USER COMPLAINTS */

@GetMapping("/my")
public List<Complaint> getMy(){

Long userId = (Long) SecurityContextHolder
        .getContext()
        .getAuthentication()
        .getPrincipal();

return complaintService.getComplaintsByUser(userId);

}

/* STAFF COMPLAINTS */

@GetMapping("/staff")
public List<Complaint> getStaff(){

Long staffId = (Long) SecurityContextHolder
        .getContext()
        .getAuthentication()
        .getPrincipal();

return complaintService.getComplaintsByStaff(staffId);

}

/* SINGLE COMPLAINT */

@GetMapping("/{id}")
public Complaint getById(@PathVariable Long id){

return complaintService.getComplaintById(id);

}

/* UPDATE STATUS */

@PutMapping("/status/{id}")
public Complaint updateStatus(
@PathVariable Long id,
@RequestParam String status){

return complaintService.updateStatus(id,status);

}

/* ASSIGN STAFF */

@PostMapping("/assign")
public Complaint assignStaff(
@RequestParam Long complaintId,
@RequestParam Long staffId){

return complaintService.assignComplaint(complaintId,staffId);

}

/* ESCALATE COMPLAINT */

@PutMapping("/escalate/{id}")
public Complaint escalateComplaint(@PathVariable Long id){

return complaintService.escalateComplaint(id);

}

}