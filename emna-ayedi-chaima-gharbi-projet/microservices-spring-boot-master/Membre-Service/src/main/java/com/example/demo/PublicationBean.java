package com.example.demo;

import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;



//Java bean non persistant ayant les mêmes attributs que l'entité Publication
@Data
public class PublicationBean {
	private Long id;
	private String titre;
	private String type;//article de journal/ manifestation/chapitre de livre/livre/poster
	private Date dateApparition;
	private String lien;
	private String sourcePdf;
	
}
