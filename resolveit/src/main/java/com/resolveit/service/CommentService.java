package com.resolveit.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.resolveit.model.Comment;
import com.resolveit.repository.CommentRepository;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor

public class CommentService {

private final CommentRepository commentRepository;

/* ADD COMMENT */

public Comment addComment(Long complaintId, Long userId, String desc, String status){

Comment comment = new Comment();

comment.setComplaintsId(complaintId);
comment.setUserId(userId);
comment.setDescription(desc);
comment.setStatusType(status);
comment.setDate(LocalDate.now());

return commentRepository.save(comment);

}

/* GET COMMENTS */

public List<Comment> getComments(Long complaintId){

return commentRepository.findByComplaintsId(complaintId);

}

}