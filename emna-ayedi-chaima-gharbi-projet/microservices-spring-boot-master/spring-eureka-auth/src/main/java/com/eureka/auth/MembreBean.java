package com.eureka.auth;

import lombok.Data;
import lombok.NonNull;

import java.util.Date;

public class MembreBean {
    private Long id;
    private String cin;
    private String nom;
    private String prenom;
    private Date dateNaissance;

    public Long getId() {
        return id;
    }

    public String getCin() {
        return cin;
    }

    public String getNom() {
        return nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Date getDateNaissance() {
        return dateNaissance;
    }

    public String getCv() {
        return cv;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    private String cv;
    private byte[] photo;
    private String email;
    private String password;
}
