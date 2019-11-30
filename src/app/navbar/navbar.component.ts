import { Component, OnInit } from '@angular/core';
// Modules for social networks
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
// Router
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  //User
  public user: SocialUser;
  private loggedIn: boolean;

  constructor(private authService: AuthService,
              private _route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {

    this.authService.authState.subscribe((user) => {
      //User Log In
      this.user = user;
      this.loggedIn = (user != null);
      if (!this.loggedIn) {
        alert('Come Back Soon')
        this._router.navigate(['/login']);
      }
    });

  }
  signOutWithGoogle(): void {
    this.authService.signOut();
  }

}