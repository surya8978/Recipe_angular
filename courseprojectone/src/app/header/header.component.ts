import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { dataStorageService } from '../Shared/data-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  isAuthenticated  = false;
  private userSub : Subscription;
  constructor(private dataStoragaService:dataStorageService,private authService: AuthService) { }

  ngOnInit(): void {
   this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
   });
  }

  onSaveData(){
    this.dataStoragaService.storeRecipes();
  }
  onFetchData(){
    this.dataStoragaService.fetchRecipes().subscribe();
  }
  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
