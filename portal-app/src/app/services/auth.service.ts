import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';

  private apiKey = 'AIzaSyAqw-N3zVyHOvAvrwPfBkVUqf7eUHEzo4c';

  userToken?: string;

  constructor(private http: HttpClient) {
    this.getToken();
  }


  login(usuario: UsuarioModel) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(
      map(resp => {
        console.log('Entró en el mapa del RXJS: ');
        console.log(resp['idToken']);
        this.saveToken(resp['idToken']);
        return resp;
      })
    );

  }

  logout() {
    localStorage.removeItem('token');
  }

  newUser(usuario: UsuarioModel) {

    /* con ...usuario se agregaran a la constante authData
     * todos los atributos de la variable usuario
    */
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signUp?key=${this.apiKey}`,
      authData
    ).pipe(
      map(resp => {
        console.log('Entró en el mapa del RXJS: ');
        console.log(resp['idToken']);
        this.saveToken(resp['idToken']);
        return resp;
      })
    );
  }


  private saveToken(idToken: string) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expiredToken', hoy.getTime().toString());

  }

  getToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  isAuthenticated(): boolean {

    if (this.userToken.length < 2) {
      return false;
    }

    const tokenExpira = Number(localStorage.getItem('expiredToken'));
    const tokenExpiraDate = new Date();
    tokenExpiraDate.setTime(tokenExpira);

    if (tokenExpiraDate > new Date()) {
      return true;
    } else {
      return false;
    }

  }
}
