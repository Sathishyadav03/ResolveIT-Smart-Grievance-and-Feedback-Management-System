package com.resolveit.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.resolveit.model.Comment;
import com.resolveit.service.CommentService;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
@CrossOrigin("*")

public class CommentController {

private final CommentService commentService;

/* ADD COMMENT */

@PostMapping("/add")
public Comment addComment(@RequestBody Comment request){

Long userId = Long.parseLong(
        SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal()
                .toString()
);

return commentService.addComment(
        request.getComplaintsId(),
        userId,
        request.getDescription(),
        request.getStatusType()
);

}

/* GET COMMENTS */

@GetMapping("/{complaintId}")
public List<Comment> getComments(@PathVariable Long complaintId){

return commentService.getComments(complaintId);

}

}