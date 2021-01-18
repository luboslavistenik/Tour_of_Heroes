import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import { Item } from '../item';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  itemFormGroup: FormGroup;

  constructor(private itemService:ItemService, private router:Router) { }

  ngOnInit(): void {
    this.itemFormGroup = new FormGroup({
      name: new FormControl('',[Validators.maxLength(20), Validators.required]),
      price: new FormControl('',[numberFromTo(1,4000), Validators.required]),
    })}

  onSubmit() { 
    const controls = this.itemFormGroup.controls;
    const item : Item = {
      name: controls.name.value,
      price: controls.price.value
    }
    this.itemService.addItem(item).subscribe();
    this.router.navigate(['/items'])} 
  }
  function numberFromTo(from:number, to:number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const number: number = +control.value;
      const inRange: boolean = number <= to && number >= from;
      return inRange ? null : {number: {value: number}};
    }};