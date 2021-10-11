import {Component, OnInit, Output} from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Output() isLoggedIn: boolean;
  user: any;
  info: any;

  constructor(private token: TokenStorageService
  ) {
  }

  ngOnInit(): void { this.info = {
    token: this.token.getToken(),
    username: this.token.getUsername(),
    authorities: this.token.getAuthorities()
  };
}

logout() {
  this.token.signOut();
  window.location.reload();
}
}
