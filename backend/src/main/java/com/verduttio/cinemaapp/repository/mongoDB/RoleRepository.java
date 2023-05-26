package com.verduttio.cinemaapp.repository.mongoDB;

import com.verduttio.cinemaapp.entity.ERole;
import com.verduttio.cinemaapp.entity.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}
