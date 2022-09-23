package com.verduttio.cinemaapp.repository;

import com.verduttio.cinemaapp.entity.ERole;
import com.verduttio.cinemaapp.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(ERole name);
}
