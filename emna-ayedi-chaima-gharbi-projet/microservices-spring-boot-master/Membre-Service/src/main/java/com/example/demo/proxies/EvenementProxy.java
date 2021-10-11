package com.example.demo.proxies;

import com.example.demo.EvenementBean;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "evenement-service")
public interface EvenementProxy {
        @GetMapping(value = "/evenements")
        CollectionModel<EvenementBean> listeDesEvenements();

        @GetMapping( value = "/evenements/{id}")
        EntityModel<EvenementBean> recupererUnEvenement(@PathVariable("id") Long id);

    }
