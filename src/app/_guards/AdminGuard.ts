import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {User} from "../_models/user";

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      const user: User = JSON.parse(localStorage.getItem('currentUser'));
      if (user.isAdmin) {
        return true;
      }
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['tables']);
    return false;
  }
}
