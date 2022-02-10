import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "./user.auth";

export interface AuthResponseData{
    kind:string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    //? is for optional
    registered? :boolean;
}

@Injectable({providedIn:'root'})
 
export class AuthService{
    private tokenExpirationTimer:any;
    user = new BehaviorSubject<User>(null);

    constructor(private http:HttpClient,private router :Router){}

    //go to firebase docs for the url and Required variables
    signup(email:string,password:string){
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey ,
       {
          
          email:email,
          password:password,
          returnSecureToken:true
       }
       // below tap is for userdata Creation
       ).pipe(catchError(this.handleError), tap( resData =>{
          this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
        } ));
    }
   
    login(email:string,password:string){
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
        {
            email:email,
            password:password,
            returnSecureToken:true
        } ).pipe(catchError(this.handleError),tap( resData =>{
            this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
          } ));
    }
    autoLogin(){
        const userData:{
        email:string;
        id:string;
        _token:string;
        _tokenExpirationDate : string;
        } = JSON.parse( localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
        if(loadedUser.token){
            this.user.next(loadedUser);
            //for auto logout
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }
    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        // for auto logout
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration:number){
      this.tokenExpirationTimer = setTimeout(() =>{
        this.logout();
       },expirationDuration);
    }
//for userdata Creation
private handleAuthentication(email:string,userId:string,token :string,expiresIn:number){
    const expirationdate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email,userId,token,expirationdate);
    this.user.next(user);
    //for auto logout
    this.autoLogout(expiresIn * 1000);
    // for auto login 
    localStorage.setItem('userData', JSON.stringify(user));
}

private handleError(errorRes :HttpErrorResponse){
    let errorMessage = 'An Unknown error Occurred!';
           if(!errorRes.error || !errorRes.error.error){
               return throwError(errorMessage);
           }
           switch(errorRes.error.error.message){
               case 'Email_Exists':
                   errorMessage = 'This Email Exists already';
                   break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'Invalid Password';
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'Email does Not Exist';
                    break;
           }
           return throwError(errorMessage);
       }
}
