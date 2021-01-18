import { Location } from '@angular/common';

import { HeroService } from './../hero.service';
import { Item } from './../item';
import { Component } from '@angular/core';
import { Router }from '@angular/router';
import { Hero } from '../hero';
import { ItemService } from '../item.service';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent {

  items:Item[];

  heroFormGroup: FormGroup;

  constructor(private itemService:ItemService, private heroService:HeroService, private router:Router){}
  ngOnInit(): void {
    this.heroFormGroup = new FormGroup({
      name: new FormControl('',[Validators.maxLength(20), Validators.required]),
      life: new FormControl('',[numberFromTo(1,200), Validators.required]),
      strength: new FormControl('',[numberFromTo(1,50), Validators.required]),
      money: new FormControl('', [Validators.required])
    })
    this.getItems();
  }

  
  onSubmit() { 
    const controls = this.heroFormGroup.controls;
    const hero : Hero = {
      name: controls.name.value,
      life: controls.life.value,
      strength: controls.strength.value,
      money: controls.money.value,
      itemList: []
    }

    this.heroService.addHero(hero).subscribe();
    this.router.navigate(['/heroes'])
  }
  
  getItems():void {
    this.itemService.getItems().subscribe(items => this.items = items);
  }
}
function numberFromTo(from:number, to:number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const number: number = +control.value;
    const inRange: boolean = number <= to && number >= from;
    return inRange ? null : {number: {value: number}};
  };
}


