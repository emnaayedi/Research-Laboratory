import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormControlName, FormControl, Validators, FormGroup } from '@angular/forms';
import { Member } from 'src/models/memeber.model';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   
  loginForm: FormGroup;

  user:Member;
  constructor(private loginService:LoginService,private router: Router ) { }

  ngOnInit(): void {
    this. loginForm = new FormGroup({
      username: new FormControl( null, [Validators.required ]),
      password: new FormControl( null,[Validators.required ]),
    
    });
    
  }
  login()
  {
    this.user = this.loginForm.value;
    console.log(this.user);
    this.loginService.login(this.user)
    .subscribe(data =>
      {//console.log(data);
        let jwt = data.headers.get('Authorization');
      console.log(jwt)
       // this.ngOnInit
        this.loginService.saveJwt(jwt);
      //  console.log(jwt);
        this.router.navigate(['/membre']);
      }, err=>{
      //  console.log(err);
      }
      );
  }

}
