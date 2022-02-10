import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ingredient } from "../Shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipie.model";

@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>()

    //we no longer need these recipes as we are freching them from DB
    // private recipes:Recipe[] = [ 
    //      new Recipe('Tasty Schnitzel',
    //      'A Super Tasty Schnitzel -Just Asesome!',
    //      'https://www.simplyrecipes.com/thmb/YSlSLYrnOBfkzE3rD_uMSnA8dlA=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Homemade-Pizza-LEAD-3-8aa37af554cf4445a1e3e54fdc66e974.jpg',
    //      [
    //          new ingredient('Meat',1),
    //          new ingredient('French Fries',20)
    //      ]),
    //      new Recipe('Big Fat Burgger',
    //      'What else you need to say?',
    //      'https://thumbs.dreamstime.com/z/big-fat-burger-hamburger-bacon-chop-isolated-white-background-closeup-72015172.jpg',
    //      [
    //          new ingredient('Buns',2),
    //          new ingredient('Meat',1)   
    //      ])
    //    ];
    private recipes:Recipe[] =[];
      constructor(private slService:ShoppingListService){

      }
      //to update the recipes that we freched from DB
      setRecipes(recipes:Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());  
      }
      getRecipes(){
          //this fun is to avoid changes of this main array from outside it will call only copy of this arr
          return this.recipes.slice();
      }
      getRecipe(index:number){
          return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients:ingredient[]){
          this.slService.addIngredients(ingredients);
      }
      addRecipe(recipe:Recipe){
         this.recipes.push(recipe);
         this.recipesChanged.next(this.recipes.slice());
      }
      updateRecipe(index:number,newRecipe:Recipe){
         this.recipes[index] = newRecipe;
         this.recipesChanged.next(this.recipes.slice());
      }
       deleteRecipe(index:number){
           this.recipes.splice(index,1);
           this.recipesChanged.next(this.recipes.slice());
       }
}