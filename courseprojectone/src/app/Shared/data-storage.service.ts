import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipie.model";
import {exhaustMap, map, take, tap} from "rxjs/operators"
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn:'root'})
export class dataStorageService{
    constructor(private http :HttpClient,private recipeServices:RecipeService , private authService:AuthService){}
 
    //to save data 
    storeRecipes(){
       const recipes = this.recipeServices.getRecipes();
       this.http.put('https://ng-course-recipebook-project-default-rtdb.firebaseio.com/recipes.json',recipes)
       .subscribe(response => { 
           console.log(response);
       })
    }
 //params are to add quires
    fetchRecipes(){
      
            return this.http.get<Recipe[]>('https://ng-course-recipebook-project-default-rtdb.firebaseio.com/recipes.json',
            ).pipe(
         map(recipes =>{
            return recipes.map(recipe =>{
                return{...recipe,ingredients:recipe.ingredients ? recipe.ingredients : []};
            });
        }),tap(recipes =>{
            this.recipeServices.setRecipes(recipes);
        })
        );
    }
}

 