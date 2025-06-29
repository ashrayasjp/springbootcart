package com.gamestore.game_backend.repository;

import com.gamestore.game_backend.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {
}
