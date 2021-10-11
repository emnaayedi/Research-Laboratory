package com.example.demo.controller;

import java.util.Collection;
import java.util.List;


import com.example.demo.EvenementBean;
import com.example.demo.OutilBean;
import com.example.demo.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

import com.example.demo.PublicationBean;
import com.example.demo.proxies.PublicationProxy;
import com.example.demo.proxies.EvenementProxy;
import com.example.demo.proxies.OutilProxy;
import com.example.demo.service.IMemberService;



@RestController
public class MembreRestController {
	@Autowired
	IMemberService iMemberService;
	@Autowired
	PublicationProxy publicationproxy;
	@Autowired
	EvenementProxy evenementproxy;
	@Autowired
	OutilProxy outilproxy;
	@GetMapping(value = "/membres")
	public List<Membre> findAllmembres()
	{
		return iMemberService.findAll();
	}

	@DeleteMapping(value = "/membres/{id}")
	public void deleteMember(@PathVariable Long id)
	{
		iMemberService.deleteMember(id);
	}
	@GetMapping(value = "/membres/{id}")
	public Membre findoneMembre(@PathVariable Long id)
	{
		return iMemberService.findMember(id);
	}


	@GetMapping(value = "/membres/etudiants")
	public List<Etudiant> findAllEtudiant()
	{
		return iMemberService.findAllEtudiants();
	}
	@GetMapping(value = "/membres/enseignants")
	public List<EnseignantChercheur> findAllEnseignantChercheur()
	{
		return iMemberService.findAllEnseignants();
	}


	@GetMapping(value = "/membres/etab/{etablissement}")
	public List<EnseignantChercheur> findByEtablissement(@PathVariable String etablissement)
	{
		return iMemberService.findByEtablissement(etablissement);
	}

	@GetMapping(value = "/publication/{titre}")
	public EntityModel<PublicationBean> findbyType(@PathVariable String titre)
	{
		return publicationproxy.findByTitre(titre);
	}

	@GetMapping(value = "/membres/grade/{grade}")
	public List<EnseignantChercheur> findByGrade(@PathVariable String grade)
	{
		return iMemberService.findByGrade(grade);
	}


	@GetMapping(value = "/all/outils/membre")
	public List<Membre_Outil> findAllOutilMember()
	{
		return iMemberService.findAllOutil();
	}

	@PostMapping(value = "/membres/etudiant")
	public Membre addMembre(@RequestBody Etudiant etd)
	{
		return iMemberService.addMember(etd);
	}

	@PutMapping(value = "/membres/enseignant")
	public Membre addMembre(@RequestBody EnseignantChercheur ens)
	{
		return iMemberService.addMember(ens);
	}
	@PutMapping(value="/membres/etudiant/{id}")
	public Membre updatemembre(@PathVariable Long id, @RequestBody Etudiant p)
	{
		p.setId(id);
		return iMemberService.updateMember(p);
	}

	@PutMapping(value="/membres/enseignant/{id}")
	public Membre updateMembre(@PathVariable Long id, @RequestBody EnseignantChercheur p)
	{
		p.setId(id);
		return iMemberService.updateMember(p);
	}
	@PutMapping(value="/membres/etudiant")
	public Membre affecter(@RequestParam Long idetd , @RequestParam Long idens )
	{

		return iMemberService.affecterencadrantToetudiant(idetd, idens);
	}
	@GetMapping("/publications")
	public CollectionModel<PublicationBean>listerpublication()
	{
		return publicationproxy.listeDesPublications();

	}
	@GetMapping("/publications/{id}")
	public EntityModel<PublicationBean> listerunepublication(@PathVariable Long id)
	{
		return publicationproxy.recupererUnePublication(id);

	}
	@GetMapping("/publications/auteur/{id}")
	public List<PublicationBean>listerpublicationbymembre(@PathVariable(name="id") Long idaut)
	{
		return iMemberService.findPublicationparauteur(idaut);
	}
	@GetMapping("/evenements")
	public CollectionModel<EvenementBean>listerevenement()
	{
		return evenementproxy.listeDesEvenements();

	}
	@GetMapping("/evenements/{id}")
	public EntityModel<EvenementBean> listeruneevenement(@PathVariable Long id)
	{
		return evenementproxy.recupererUnEvenement(id);

	}
	@GetMapping("/evenements/participant/{id}")
	public List<EvenementBean>listerevenementbymembre(@PathVariable(name="id") Long idpart)
	{
		return iMemberService.findEvenementparparticipant(idpart);
	}
	@GetMapping("/outils")
	public CollectionModel<OutilBean>listeroutil()
	{
		return outilproxy.listeDesOutils();

	}
	@GetMapping("/outils/{id}")
	public EntityModel<OutilBean> listerunoutil(@PathVariable Long id)
	{
		return outilproxy.recupererUnOutil(id);

	}

	@PostMapping(value="/outils/outil/{idoutil}/{iddev}")
	public Membre_Outil affecterdeveloppeurtooutil(@PathVariable Long idoutil, @PathVariable Long iddev )
	{

		return iMemberService.affecterdeveloppeurTooutil(iddev, idoutil);

	}
	@PostMapping("/membre_evenement/{idMember}/{idEvent}")
	public void affectMemberToEvent(@PathVariable Long idMember, @PathVariable Long idEvent) {
		System.out.println(idMember); Long id1=new Long(idMember);
		System.out.println(idEvent);Long id2=new Long(idEvent);
		iMemberService.affecterparticipantToevenement(id1, id2);
	}

	@PutMapping(value="/publications/publication")
	public void affecterauteurtopublication(@RequestParam Long idpub, @RequestParam Long idaut)
	{
		iMemberService.affecterauteurTopublication(idaut, idpub);


	}
	@GetMapping("/outils/developpeur/{id}")
	public List<OutilBean>listeroutilbymembre(@PathVariable(name="id") Long iddev)
	{
		return iMemberService.findOutilpardeveloppeur(iddev);
	}
	@GetMapping("/fullmember/{id}")
	public Membre findAFullMember(@PathVariable(name="id") Long id)
	{
		Membre mbr=iMemberService.findMember(id);
		mbr.setPubs(iMemberService.findPublicationparauteur(id));
		mbr.setEvents(iMemberService.findEvenementparparticipant(id));
		mbr.setOutils(iMemberService.findOutilpardeveloppeur(id));

		return mbr;
	}

}