import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private afAuth: AngularFireAuth,
        private authService: AuthService,
        private router: Router
    ) {
    }

    canActivate(): Promise<boolean> {
        console.log('under canActivate');
        return this.handleAccess();
    }

    canActivateChild(): Promise<boolean> {
        console.log('under canActivateChild');
        return this.handleAccess();
    }

    handleAccess(): Promise<boolean> {
    return null;
    }

}
