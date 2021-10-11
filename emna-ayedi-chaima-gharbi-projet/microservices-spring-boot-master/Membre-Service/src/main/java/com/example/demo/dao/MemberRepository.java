package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Etudiant;
import com.example.demo.entities.Membre;
@Repository
public interface MemberRepository extends JpaRepository<Membre,Long> {
	Membre findByCin(String cin);
	Membre findByEmail(String email);
	List<Membre> findByNom(String nom);

}
