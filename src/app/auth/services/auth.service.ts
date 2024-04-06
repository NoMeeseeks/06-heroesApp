import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = environment.baseUrl;

  private user?: User;

  constructor(private httpClient: HttpClient) { }


  get currentUser(): User | undefined {
    if (!this.user) { return undefined };

    //estructure clone
    //basicamente la solucion para hacer un clone profundo
    return structuredClone(this.user);
  }

  login(email: string, pass: string): Observable<User> {
    //http.post('login',{email,pass})
    return this.httpClient.get<User>(`${this.baseUrl}/users/?id=1`)
      .pipe(
        tap(user => this.user = user),
        tap(user => localStorage.setItem('token', 'abs'))
      )
  }

  logout() {
    this.user = undefined;
    // localStorage.removeItem()
    localStorage.clear();
  }
}
