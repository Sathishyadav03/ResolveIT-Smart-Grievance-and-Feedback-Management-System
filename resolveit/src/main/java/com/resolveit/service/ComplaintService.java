package com.resolveit.service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.resolveit.repository.ComplaintRepository;
import com.resolveit.repository.UserRepository;
import com.resolveit.model.Complaint;
import com.resolveit.model.User;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ComplaintService {

private final ComplaintRepository complaintRepository;
private final UserRepository userRepository;

public Complaint submitComplaint(Complaint complaint, Long userId){

if(!complaint.isAnonymous() && userId != null){

User user = userRepository.findById(userId).orElseThrow();

complaint.setUser(user);

}

return complaintRepository.save(complaint);

}

public Complaint assignComplaint(Long complaintId, Long staffId){

Complaint complaint = complaintRepository.findById(complaintId).orElseThrow();

complaint.setAssignedStaffId(staffId);
complaint.setStatus("ASSIGNED");

return complaintRepository.save(complaint);

}

public Complaint updateStatus(Long complaintId, String status){

Complaint complaint = complaintRepository.findById(complaintId).orElseThrow();

complaint.setStatus(status);

return complaintRepository.save(complaint);

}

public List<Complaint> getAllComplaints(){

return complaintRepository.findAll();

}

}