import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environment } from '../../../environments/environments';
import { error } from 'console';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private baseUrl: string = environment.baseUrl
  private limite: number = 5;
  constructor(private httpClient: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroesByid(id: string): Observable<Hero | undefined> {
    return this.httpClient.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(error => of(undefined))
      )
  }

  getSuggestion(query: string): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes?=${query}&limit=${this.limite}`);
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(`${this.baseUrl}/heroes`, hero)
  }

  updateHeroPorId(hero: Hero): Observable<Hero> {
    if (!hero.id) throw Error("heroe es requerido")
    return this.httpClient.patch<Hero>(`${this.baseUrl}/heroes${hero.id}`, hero)
  }

  deleteHeroPorId(hero: Hero): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/heroes${hero.id}`)
      .pipe(
        catchError(error => of(false)),
        map(respuesta => true)
      )
  }
}
