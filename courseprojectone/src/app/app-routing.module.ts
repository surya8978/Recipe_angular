import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth-guard";
import { AuthComponent } from "./auth/auth.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipesResolverService } from "./recipes/recipe-resolver.service";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesDetailsComponent } from "./recipes/recipes-details/recipes-details.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes:Routes = [
  {path:'', redirectTo:'/recipes',pathMatch:'full'},
  {path:'recipes', component:RecipesComponent, canActivate:[AuthGuard],children:[
      {path:'',component:RecipeStartComponent},
      {path:'new',component:RecipeEditComponent},
      {path:':id',component:RecipesDetailsComponent,resolve:[RecipesResolverService]},
      {path:':id/edit',component:RecipeEditComponent,resolve:[RecipesResolverService]}
  ]},
  {path:'shopping-list', component:ShoppingListComponent},
  {path:'auth',component:AuthComponent}
];
@NgModule({
  imports:[RouterModule.forRoot(appRoutes)],
  // to make this module avalible to the app module
  exports:[RouterModule]
})
export class AppRoutingModule{

}