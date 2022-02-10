import { Component,  OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ingredient } from 'src/app/Shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f',{static:false}) slForm :NgForm;
  subscription:Subscription;
  editMode = false;
  editedItemIndex :number;
  editedItem :ingredient;
  constructor(private slService:ShoppingListService) { }

  //to remove added items by clicking on them
  ngOnInit(): void {
      this.subscription = this.slService.startedEditing.subscribe(
        (index:number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          //to select the values in list to input fields
          this.slForm.setValue({
            name:this.editedItem.name,
            amount:this.editedItem.amount
          })
        }
      );
  }
  onSubmit(form:NgForm){
    const value = form.value;
   const newIngredient = new ingredient(value.name,value.amount);
   if(this.editMode){
     this.slService.updateIngredients(this.editedItemIndex,newIngredient);
   }else{
    this.slService.addIngredient(newIngredient);
   }
   this.editMode = false;
   form.reset();
  }
  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex)
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
