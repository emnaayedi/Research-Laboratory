package com.example.demo.entities;

import java.io.Serializable;
import java.util.Date;

import javax.annotation.Generated;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@DiscriminatorValue("etd")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Etudiant extends Membre implements Serializable{
	@Temporal(TemporalType.DATE)
	private Date dateInscription;
	private String sujet;
	private String diplome;
	
	
	@ManyToOne
	private EnseignantChercheur encadrant;
	
	@Builder
	public Etudiant( String cin, String nom, String prenom, Date dateNaissance, String cv,
			String email, String password, Date dateInscription, String sujet, String diplome,
			EnseignantChercheur encadrant) {
		super( cin, nom, prenom, dateNaissance, cv,  email, password);
		this.dateInscription = dateInscription;
		this.sujet = sujet;
		this.diplome = diplome;
		this.encadrant = encadrant;
	}
	
	
	
	

}
