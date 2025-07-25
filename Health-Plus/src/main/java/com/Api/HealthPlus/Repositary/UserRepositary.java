package com.Api.HealthPlus.Repositary;

import com.Api.HealthPlus.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepositary extends JpaRepository<User,Integer> {

    public User findByEmail(String email);
}
