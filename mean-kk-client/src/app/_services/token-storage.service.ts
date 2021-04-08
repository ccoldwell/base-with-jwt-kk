// -------------------------------------------------------------------------
//
// this is a place to store login information for various front end
// manipilations
//
// -------------------------------------------------------------------------
import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const REALM = 'mean-kk-client';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  // -------------------------------------------------------------------------
  //
  // save the Keycloak parsed token and also split out just the fun user info
  // we might need a lot
  //
  // -------------------------------------------------------------------------
  public saveToken(token: any): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify({
      name               : token.name ,
      preferred_username : token.preferred_username ,
      given_name         : token.given_name ,
      family_name        : token.family_name ,
      email              : token.email,
      roles              : token.resource_access[REALM]['roles'],
      resource_access    : token.resource_access
    }));
  }

  // -------------------------------------------------------------------------
  //
  // get the token if we need it
  //
  // -------------------------------------------------------------------------
  public getToken(): any | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  // -------------------------------------------------------------------------
  //
  // get just the user information
  //
  // -------------------------------------------------------------------------
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}
