import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
// Firebase module
import { AngularFireModule } from '@angular/fire';
// Authentication
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthenticationService } from './shared/authentication.service';
import { environment } from '../environments/environment';
// Database
import { AngularFirestore } from '@angular/fire/firestore';
// Modules for login with social networks
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HnavbarComponent } from './hnavbar/hnavbar.component';
import { UsersComponent } from './users/users.component';
import { DataUsageComponent } from './data-usage/data-usage.component';
// Charts
import { ChartsModule } from 'ng2-charts';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("519383523347-hkjs2rs3vnd1alei4oc80jn8j4puhba4.apps.googleusercontent.com")
  }
  //{
  //  id: FacebookLoginProvider.PROVIDER_ID,
  //  provider: new FacebookLoginProvider("Facebook-App-Id")
  //}
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    NavbarComponent,
    HnavbarComponent,
    UsersComponent,
    DataUsageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SocialLoginModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    ChartsModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    AuthenticationService,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
