import { Subject } from "rxjs";
import { ingredient } from "../Shared/ingredient.model";

export class ShoppingListService{
    ingredientschanged = new Subject<ingredient[]>();
    startedEditing = new Subject<number>();
   private ingredients:ingredient[] = [
        new ingredient('Apples',5),
        new ingredient('Tomatoes',10)
      ];
      
      getIngredients(){
           //this fun is to avoid changes of this main array from outside it will call only copy of this arr
          return this.ingredients.slice();
      }
      getIngredient(index:number){
        return this.ingredients[index];
      }
      addIngredient(ingredient:ingredient){
         this.ingredients.push(ingredient);
         this.ingredientschanged.next(this.ingredients.slice());
      }
      addIngredients(ingredients:ingredient[]){
        // for(let ingredient of ingredients){
        //   this.addIngredient(ingredient);
        // }
        this.ingredients.push(...ingredients);
        this.ingredientschanged.next(this.ingredients.slice());
      }
      updateIngredients(index:number,newIngredient:ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientschanged.next(this.ingredients.slice());
      }
      deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientschanged.next(this.ingredients.slice());
      }
  
}   