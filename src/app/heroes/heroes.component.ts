import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];

  selectedHero: Hero;

  sortByInternal = {
    Id: { property: 'id', reversed: false },
    Name: { property: 'name', reversed: false },
    Money: { property: 'money', reversed: true },
    Life: { property: 'life', reversed: true },
    Strength: { property: 'strength', reversed: true },
  };

  sortByProperties: string[] = Object.keys(this.sortByInternal);

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
    console.log(this.sortByProperties);
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  onSelect(hero:Hero): void {
      this.selectedHero = hero;
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  onSortChanged(event: MatSelectChange): void {
    const sortInfo = this.sortByInternal[event.value];
    const property = sortInfo.property;

    this.heroes.sort((a,b) => {
      const compared: number = a[property] > b[property] ? 1 : -1;
      return sortInfo.reversed ? -compared : compared;
    });
  }

}