import { Component, OnInit } from '@angular/core';
// FireStore Service
import { FirestoreService } from '../services/firestore/firestore.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users = [];

  constructor(private db: FirestoreService) { }

  ngOnInit() {
    this.db.getUsers().subscribe(res => {
      res.forEach(data => {
        this.users.push(data.payload.doc.data());
      });
    });
  }

}
