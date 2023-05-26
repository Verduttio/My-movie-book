package com.verduttio.cinemaapp.entity;

import java.util.Set;

public record UserSafeData(String id, String username, String email, Set<Role> roles) {
}
