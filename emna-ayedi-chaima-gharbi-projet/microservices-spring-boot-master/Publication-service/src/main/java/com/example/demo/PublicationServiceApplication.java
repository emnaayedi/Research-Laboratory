package com.example.demo;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import com.example.demo.dao.PublicationRepository;
import com.example.demo.entity.Publication;
import org.springframework.hateoas.config.EnableHypermediaSupport;

@SpringBootApplication
@EnableDiscoveryClient
@EnableHypermediaSupport(type = EnableHypermediaSupport.HypermediaType.HAL)
public class PublicationServiceApplication implements CommandLineRunner{
	@Autowired
	PublicationRepository publicationRepository;
	@Autowired
    RepositoryRestConfiguration configuration;

	public static void main(String[] args) {
		SpringApplication.run(PublicationServiceApplication.class, args);
	}
	public void run(String... args) throws Exception {
		configuration.exposeIdsFor(Publication.class);
		Publication pubs1= new Publication("an approach for testing soa systems", "article", new Date(), "lien", "pdf");
		Publication pubs2= new Publication("towards cloud computing : issues and challenges", "chapitre de livre",new Date(), "lien", "pdf");
		Publication pubs3= new Publication("introducing blochain systems","article", new Date(), "lien", "pdf");
		 publicationRepository.save(pubs1);
		 publicationRepository.save(pubs2);
		 publicationRepository.save(pubs3);
		 
	}

}
