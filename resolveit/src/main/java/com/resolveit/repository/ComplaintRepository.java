package com.resolveit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.resolveit.model.Complaint;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

}