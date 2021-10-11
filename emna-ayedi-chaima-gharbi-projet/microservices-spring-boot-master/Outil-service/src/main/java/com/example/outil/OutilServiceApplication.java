package com.example.outil;

import com.example.outil.dao.OutilRepository;
import com.example.outil.entities.Outil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.Date;

@SpringBootApplication
@EnableDiscoveryClient
public class OutilServiceApplication implements CommandLineRunner {
    @Autowired
    OutilRepository outilRepository;
    @Autowired
    RepositoryRestConfiguration configuration;
    public static void main(String[] args) {
        SpringApplication.run(OutilServiceApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        configuration.exposeIdsFor(Outil.class);
        Outil outil1=new Outil(new Date(),"x=1");
        outilRepository.save(outil1);
    }
}
