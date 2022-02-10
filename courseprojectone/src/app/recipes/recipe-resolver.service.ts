import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { dataStorageService } from "../Shared/data-storage.service";
import { RecipeService } from "./recipe.service";
import { Recipe } from "./recipie.model";

@Injectable({providedIn:'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private dataStorageService : dataStorageService,private recipesService:RecipeService){}

    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        const recipes = this.recipesService.getRecipes();
        if(recipes.length === 0){
            return this.dataStorageService.fetchRecipes();
        }else{
            return recipes;
        }
        

    }
}