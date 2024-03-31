import { Component, OnInit, Pipe } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  })

  public publisher =
    [
      {
        id: 'Dc Comics', des: 'DC - Comics'
      }, {
        id: 'Marvel Comics', des: 'Marvel - Comics'
      }
    ]

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroesByid(id)),
      ).subscribe(hero => {
        if (!hero) { return this.router.navigateByUrl('/'); }

        this.heroForm.reset(hero);
        return;
      })
  }

  get currentHero(): Hero {
    const heroe = this.heroForm.value as Hero;
    return heroe;
  }

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroesService.updateHeroPorId(this.currentHero)
        .subscribe(hero => {
          //TODO: mostar snackbar
          this.showSnackBar(`${hero.superhero} actualizado`)
        });
      return;
    }

    this.heroesService.addHero(this.currentHero)
      .subscribe(hero => {
        //TODO: mostrar snackbar, y navegar a /heroes/edit/hero.id
        this.router.navigate(['/heroes/edit', hero.id])
        this.showSnackBar(`${hero.superhero} creado`)
      })
  }

  showSnackBar(mensaje: string): void {
    this.snackbar.open(mensaje, 'ok', {
      duration: 2500
    })
  }
}
