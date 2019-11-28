import { Component, OnInit } from '@angular/core';
// FireStore Service
import { FirestoreService } from '../services/firestore/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public dashboard: any = false;
    public users: any = false;
    public data_usage: any = false;

  constructor(private db: FirestoreService) { }

  ngOnInit() {
    // Get Page Status
    this.db.getPage().subscribe(res => {
      this.dashboard = res.payload.data();
      this.dashboard = this.dashboard.dashboard;
      this.users = res.payload.data();
      this.users = this.users.users;
      this.data_usage = res.payload.data();
      this.data_usage = this.data_usage.data_usage;
    });

  }
}
