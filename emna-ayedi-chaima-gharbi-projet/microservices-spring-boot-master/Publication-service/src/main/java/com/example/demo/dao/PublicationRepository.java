package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;

import com.example.demo.entity.Publication;

@RepositoryRestController
public interface PublicationRepository extends JpaRepository<Publication, Long> {

}
