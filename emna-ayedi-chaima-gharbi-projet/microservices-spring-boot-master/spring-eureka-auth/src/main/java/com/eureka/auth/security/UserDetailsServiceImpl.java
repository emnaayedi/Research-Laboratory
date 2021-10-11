package com.eureka.auth.security;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
@JsonIgnoreProperties(ignoreUnknown = true)
class Membre {
	private Long id;
	private String cin;
	private String nom;
	private String prenom;

	private String cv;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCin() {
		return cin;
	}

	public void setCin(String cin) {
		this.cin = cin;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getCv() {
		return cv;
	}

	public void setCv(String cv) {
		this.cv = cv;
	}

	public byte[] getPhoto() {
		return photo;
	}

	public void setPhoto(byte[] photo) {
		this.photo = photo;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	private byte[] photo;
	private String email;
	private String password;
	// add getters and setters
}
@Service   // It has to be annotated with @Service.
public class UserDetailsServiceImpl implements UserDetailsService  {

	@Autowired
	private BCryptPasswordEncoder encoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		RestTemplate restTemplate = new RestTemplate();

		ResponseEntity<List<Membre>> rateResponse =
				restTemplate.exchange("http://localhost:9999/membre-service/membres",
						HttpMethod.GET, null, new ParameterizedTypeReference<List<Membre>>() {
						});
		List<Membre> membres = rateResponse.getBody();



		for(Membre member :membres){
			System.out.println(member);
			final List<AppUser> users = Arrays.asList(
					new AppUser(member.getId(), member.getPrenom(), encoder.encode(member.getPassword()), "USER")
			);


			for(AppUser appUser: users) {
				if(appUser.getUsername().equals(username)) {

					// Remember that Spring needs roles to be in this format: "ROLE_" + userRole (i.e. "ROLE_ADMIN")
					// So, we need to set it to that format, so we can verify and compare roles (i.e. hasRole("ADMIN")).
					List<GrantedAuthority> grantedAuthorities = AuthorityUtils
							.commaSeparatedStringToAuthorityList("ROLE_" + appUser.getRole());

					// The "User" class is provided by Spring and represents a model class for user to be returned by UserDetailsService
					// And used by auth manager to verify and check user authentication.
					return new User(appUser.getUsername(), appUser.getPassword(), grantedAuthorities);
				}
			}}

		// If user not found. Throw this exception.
		throw new UsernameNotFoundException("Username: " + username + " not found");
	}

	// A (temporary) class represent the user saved in the database.
	private static class AppUser {
		private Long id;
		private String username, password;
		private String role;

		public AppUser(Long id, String username, String password, String role) {
			this.id = id;
			this.username = username;
			this.password = password;
			this.role = role;
		}

		public Long getId() {
			return id;
		}

		public String getUsername() {
			return username;
		}

		public void setUsername(String username) {
			this.username = username;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}
		public String getRole() {
			return role;
		}

		public void setRole(String role) {
			this.role = role;
		}
	}
}