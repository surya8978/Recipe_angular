import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ingredient } from '../Shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients:ingredient[];
  //if we use subscribe 
  private subscription: Subscription;

  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientschanged.subscribe(
      (ingredients: ingredient[]) => {
         this.ingredients  = ingredients;
      }
    );
  }
  //to remove added item by clicking on it 
  onEditItem(index :number){
    this.slService.startedEditing.next(index);
  }
  //required if you are using subject
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
