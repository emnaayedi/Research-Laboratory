package com.example.demo.dao;

import com.example.demo.entities.Membre_Even_Ids;
import com.example.demo.entities.Membre_Evenement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository

public interface MembreevenementRepository extends JpaRepository<Membre_Evenement, Membre_Even_Ids> {
    @Query("select m from Membre_Evenement m where participant_id=:x")
    List<Membre_Evenement> findevenId(@Param("x") Long evenId);
}
