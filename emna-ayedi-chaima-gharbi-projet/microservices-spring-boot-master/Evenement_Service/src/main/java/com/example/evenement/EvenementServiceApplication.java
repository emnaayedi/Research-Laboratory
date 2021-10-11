package com.example.evenement;

import com.example.evenement.dao.EvenementRepository;
import com.example.evenement.entities.Evenement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.Date;

@SpringBootApplication
@EnableDiscoveryClient
public class EvenementServiceApplication  implements CommandLineRunner {
    @Autowired
    com.example.evenement.dao.EvenementRepository EvenementRepository;
    @Autowired
    RepositoryRestConfiguration configuration;
    public static void main(String[] args) {
        SpringApplication.run(EvenementServiceApplication.class, args);
    }
    public void run(String... args) throws Exception {
        configuration.exposeIdsFor(Evenement.class);
        Evenement event1= new Evenement( "PYFAC", new Date(),new Date(), "ENIS");
        EvenementRepository.save(event1);


    }
}
