package com.resolveit.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.resolveit.model.Comment;
import com.resolveit.model.Complaint;
import com.resolveit.repository.CommentRepository;
import com.resolveit.repository.ComplaintRepository;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor

public class CommentService {

private final CommentRepository commentRepository;
private final ComplaintRepository complaintRepository;

/* ADD COMMENT */

public Comment addComment(Long complaintId, Long userId, String desc, String status){

Comment comment = new Comment();

comment.setComplaintsId(complaintId);
comment.setUserId(userId);
comment.setDescription(desc);
comment.setStatusType(status);
comment.setDate(LocalDate.now());

Comment savedComment = commentRepository.save(comment);

/* UPDATE COMPLAINT STATUS */

Complaint complaint = complaintRepository.findById(complaintId)
.orElseThrow(() -> new RuntimeException("Complaint not found"));

complaint.setStatusType(status);

complaintRepository.save(complaint);

return savedComment;

}

/* GET COMMENTS */

public List<Comment> getComments(Long complaintId){

return commentRepository.findByComplaintsId(complaintId);

}

}
