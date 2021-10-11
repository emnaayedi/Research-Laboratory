package com.example.demo.entities;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@DiscriminatorValue("ens")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EnseignantChercheur extends Membre implements Serializable{
	private String etablissement;
	private String grade;
	
	@Builder
	public EnseignantChercheur( String cin, String nom, String prenom, Date dateNaissance, String cv,
			String email, String password, String etablissement, String grade) {
		super( cin, nom, prenom, dateNaissance, cv, email, password);
		this.etablissement = etablissement;
		this.grade = grade;
	}
	
	@OneToMany(mappedBy = "encadrant")
	@JsonIgnore
	private Collection<Etudiant> etudiants;
	
}
