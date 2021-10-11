package com.example.demo.dao;



import com.example.demo.entities.Membre_Outil;
import com.example.demo.entities.Membre_Outil_Ids;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface MembreoutilRepository extends JpaRepository <Membre_Outil, Membre_Outil_Ids> {
    @Query("select m from Membre_Outil m where developpeur_id=:x")
    List<Membre_Outil> findoutilId(@Param("x") Long devId);
}
