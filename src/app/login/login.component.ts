import { Component, OnInit } from '@angular/core';
// Module for Firebase
import { AuthenticationService } from '../shared/authentication.service';
// Modules for Firestore
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreService } from '../services/firestore/firestore.service';
// Modules for login for social networks
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
// Router
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //Login
  private user: SocialUser;
  private loggedIn: boolean;
  //Auth
  public email = 'nelson.soberon@utec.edu.pe';
  public password = 'Ut3c1461';
  //Database Use
  public items = [];
  //Pages
  public dashboard : boolean;

  constructor(private authService: AuthService,
              public authenticationService: AuthenticationService,
              public db: AngularFirestore,
              public db_test: FirestoreService,
              private _route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {
    // Login to Firebase
    this.signFireIn();
    this.authService.authState.subscribe((user) => {
      //User Log In
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.loggedIn);
      if (this.loggedIn) {
        this._router.navigate(['/home']);
        this.db_test.setPage(true,false,false);
        console.log("Redirected!");
      }
      this.loggedIn = null;
    });
  }
  // SignIn and Out of GOOGLE
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }


  signOutWithGoogle(): void {
    this.authService.signOut();
  }
  // SignIN and Out of FIREBASE

  signFireIn(){
    this.authenticationService.SignIn(this.email, this.password);
  }
  signFireOut(){
    // Firebase auth
    this.authenticationService.SignOut();
  }
}
