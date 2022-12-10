package com.api.exptracker.repository;

import com.api.exptracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

//User Repository using JpaRepository that extends User class w/ long id
public interface UserRepository extends JpaRepository<User, Long> {
}
