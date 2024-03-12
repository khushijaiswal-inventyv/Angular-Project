import { isPlatformBrowser } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import {  Inject, Injectable, PLATFORM_ID,} from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route: Router,@Inject(PLATFORM_ID) private platformId: Object) { }
  canActivate():boolean{
    let authToken;
    if (isPlatformBrowser(this.platformId)) {
    authToken = sessionStorage.getItem('token');
    }
    if(!authToken){
      console.log('No Auth Token');
      this.route.navigate(['/']);
      return false;
    }
    return true;
  }
  getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}
