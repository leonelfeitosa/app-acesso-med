import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthRouteGuardService implements CanActivate {

  constructor(private http: HttpClient, private navCtrl: NavController, private authService: AuthService) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree |Observable<boolean | UrlTree> |
  Promise<boolean |UrlTree> {
    return this.authService.isAuthenticated().pipe(map((data) => {
      return true;
    }), catchError((err) => {
      this.navCtrl.navigateRoot('/login');
      return of(false);
    }));
  }

}
