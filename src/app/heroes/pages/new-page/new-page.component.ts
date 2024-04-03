import { Component, OnInit, Pipe } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { error } from 'console';
import { ConfirmDialogComponent } from '../../components/confirm-Dialog/confirmDialog.component';

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

  public publishers =
    [
      {
        id: 'Dc Comics', desc: 'DC - Comics'
      }, {
        id: 'Marvel Comics', desc: 'Marvel - Comics'
      }
    ]

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
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
  onDeleteHero() {
    if (!this.currentHero.id) { throw Error("El id del heroe es requeridos") }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this.heroesService.deleteHeroPorId(this.currentHero.id)),
        filter((wasDeleted: boolean) => wasDeleted)
      )
      .subscribe(() => {
        this.router.navigate(['/heroes'])
      });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (!result) { return };

    //   this.heroesService.deleteHeroPorId(this.currentHero.id)
    //     .subscribe(wasDeleted => {
    //       if (wasDeleted) {
    //         this.router.navigate(['/heroes'])
    //       }
    //     });
    // });
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
