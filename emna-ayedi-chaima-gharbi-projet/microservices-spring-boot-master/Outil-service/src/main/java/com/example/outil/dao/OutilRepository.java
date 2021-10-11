package com.example.outil.dao;

import com.example.outil.entities.Outil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.stereotype.Repository;

@RepositoryRestController
public interface OutilRepository extends JpaRepository<Outil,Long> {


}
