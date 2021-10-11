package com.example.evenement.dao;

import com.example.evenement.entities.Evenement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;

@RepositoryRestController
public interface EvenementRepository extends JpaRepository<Evenement, Long> {
}
