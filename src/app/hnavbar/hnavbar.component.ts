import { Component, OnInit } from '@angular/core';
// Modules for social networks
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
// FirestoreServie
import { FirestoreService } from '../services/firestore/firestore.service';
@Component({
  selector: 'app-hnavbar',
  templateUrl: './hnavbar.component.html',
  styleUrls: ['./hnavbar.component.css']
})
export class HnavbarComponent implements OnInit {

  public user: SocialUser;

  constructor(private authService: AuthService,
              public db: FirestoreService) { }

  ngOnInit() {


    this.authService.authState.subscribe((user) => {
      //User
      this.user = user;
      
    });
  }


}
