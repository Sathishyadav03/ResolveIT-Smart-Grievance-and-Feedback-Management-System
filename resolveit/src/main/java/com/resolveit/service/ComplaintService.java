package com.resolveit.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;

import com.resolveit.model.Complaint;
import com.resolveit.model.User;
import com.resolveit.repository.ComplaintRepository;
import com.resolveit.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;

    /* SUBMIT COMPLAINT */

    public Complaint submitComplaint(Complaint complaint){
        complaint.setStatusType("OPEN");
        complaint.setCreatedAt(LocalDateTime.now());
        return complaintRepository.save(complaint);
    }

    /* GET ALL */

    public List<Complaint> getAllComplaints(){
        List<Complaint> complaints = complaintRepository.findAll();
        attachStaffNames(complaints);
        return complaints;
    }

    /* USER */

    public List<Complaint> getComplaintsByUser(Long userId){
        List<Complaint> complaints = complaintRepository.findByUserId(userId);
        attachStaffNames(complaints);
        return complaints;
    }

    /* STAFF */

    public List<Complaint> getComplaintsByStaff(Long staffId){
        List<Complaint> complaints = complaintRepository.findByAssignedStaffId(staffId);
        attachStaffNames(complaints);
        return complaints;
    }

    /* SINGLE */

    public Complaint getComplaintById(Long id){
        Complaint complaint = complaintRepository.findById(id).orElseThrow();
        attachStaffName(complaint);
        return complaint;
    }

    /* UPDATE STATUS */

    public Complaint updateStatus(Long id,String status){
        Complaint complaint = complaintRepository.findById(id).orElseThrow();
        complaint.setStatusType(status);
        return complaintRepository.save(complaint);
    }

    /* ASSIGN STAFF */

    public Complaint assignComplaint(Long complaintId,Long staffId){
        Complaint complaint = complaintRepository.findById(complaintId).orElseThrow();

        complaint.setAssignedStaffId(staffId);
        complaint.setStatusType("ASSIGNED");   // ❗ unchanged as you asked
        complaint.setAssignedAt(LocalDateTime.now());

        return complaintRepository.save(complaint);
    }

    /* MANUAL ESCALATE */

    public Complaint escalateComplaint(Long id){
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        complaint.setEscalated(true);
        complaint.setStatusType("ESCALATED");
        complaint.setEscalatedAt(LocalDateTime.now());

        return complaintRepository.save(complaint);
    }

    /* 🔥 AUTO ESCALATION */

    @Scheduled(cron = "0 0 0 * * ?")
    public void autoEscalateComplaints(){

        List<Complaint> complaints = complaintRepository.findAll();
        LocalDateTime now = LocalDateTime.now();

        for(Complaint c : complaints){

            boolean shouldEscalate =
                    "ASSIGNED".equals(c.getStatusType()) &&
                    !c.isEscalated() &&
                    c.getAssignedAt() != null &&
                    c.getAssignedAt().plusDays(3).isBefore(now);

            if(shouldEscalate){

                c.setEscalated(true);
                c.setStatusType("ESCALATED");
                c.setEscalatedAt(now);

                complaintRepository.save(c);

                System.out.println("🔥 Auto Escalated Complaint ID: " + c.getId());
            }
        }
    }

    /* HELPERS */

    private void attachStaffNames(List<Complaint> complaints){
        for(Complaint c : complaints){
            attachStaffName(c);
        }
    }

    private void attachStaffName(Complaint c){
        if(c.getAssignedStaffId()!=null){
            User staff = userRepository.findById(c.getAssignedStaffId()).orElse(null);
            if(staff!=null){
                c.setAssignedStaffName(staff.getName());
            }
        }
    }
}