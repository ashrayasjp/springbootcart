package com.gamestore.game_backend.controller;

import com.gamestore.game_backend.model.Game;
import com.gamestore.game_backend.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = "http://localhost:3000")
public class GameController {

    @Autowired
    private GameRepository repository;

    @GetMapping
    public List<Game> getAllGames() {
        return repository.findAll();
    }

    @PostMapping("/order")
    public String orderGames(@RequestBody List<Game> orders) {
        for (Game order : orders) {
            Game g = repository.findById(order.getId()).orElse(null);
            if (g != null && g.getStock() >= order.getStock()) {
                g.setStock(g.getStock() - order.getStock());
                repository.save(g);
            } else {
                return "Stock not sufficient for " + (g != null ? g.getName() : "Unknown game");
            }
        }
        return "Order placed successfully!";
    }
}