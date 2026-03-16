
package com.resolveit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.resolveit.model.User;

import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User,Long>{

    Optional<User> findByEmail(String email);

    List<User> findByRole(String role);

}

