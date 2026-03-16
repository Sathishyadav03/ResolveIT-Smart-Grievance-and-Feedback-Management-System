package com.resolveit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.resolveit.model.Comment;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long>{

List<Comment> findByComplaintsId(Long complaintsId);

}
