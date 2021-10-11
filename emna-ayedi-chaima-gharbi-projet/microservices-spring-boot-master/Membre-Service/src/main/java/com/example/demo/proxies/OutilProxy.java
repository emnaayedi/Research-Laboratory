package com.example.demo.proxies;

import com.example.demo.OutilBean;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
@FeignClient(value = "outil-service")

public interface OutilProxy {

        @GetMapping(value = "/outils")
        CollectionModel<OutilBean> listeDesOutils();

        @GetMapping( value = "/outils/{id}")
        EntityModel<OutilBean> recupererUnOutil(@PathVariable("id") Long id);

    }
