import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {

  public searchInput = new FormControl("");
  public selectedHero?: Hero;

  public heroes: Hero[] = [];
  constructor(private heroServices: HeroesService) { }

  searchHero() {
    const value: string = this.searchInput.value || '';
    if (value == '') return;

    this.heroServices.getSuggestion(value)
      .subscribe(heroes => this.heroes = heroes);
  }

  onSelectedOption(evento: MatAutocompleteSelectedEvent): void {
    if (!evento.option.value) {
      this.selectedHero = undefined
      return;
    }

    const hero: Hero = evento.option.value;
    this.searchInput.setValue(hero.superhero);

    this.selectedHero = hero;
  }
}
