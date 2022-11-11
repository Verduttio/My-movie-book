package com.verduttio.cinemaapp.entity;

import java.util.Set;

public record UserSafeData(int id, String username, String email, Set<Role> roles) {
}
