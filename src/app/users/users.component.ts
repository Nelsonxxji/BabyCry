import { Component, OnInit } from '@angular/core';
// FireStore Service
import { FirestoreService } from '../services/firestore/firestore.service';
// Router
import { Router, ActivatedRoute, Params } from '@angular/router';
// New User
import { NewUser } from '../new-user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public newUser = new NewUser();
  public users = [];
  public docs = [];

  constructor(private db: FirestoreService,
              private _router: Router) { }

  ngOnInit() {
    this.db.getUsers().subscribe(res => {
      res.forEach(data => {
        this.users.push(data.payload.doc.data());
        this.docs.push(data.payload.doc.id);
      });
    });
  }

  enableUser(name: string) {
    let userIndex: number;
    userIndex = this.users.findIndex(user => user.name == name);
    this.db.updateUser(this.docs[userIndex], {'status': 'Active'});
    this.refreshComponent();
  }

  disableUser(name: string) {
    let userIndex: number;
    userIndex = this.users.findIndex(user => user.name == name);
    this.db.updateUser(this.docs[userIndex], {'status': 'Inactive'});
    this.refreshComponent();
  }
  
  addUser() {
    this.db.setUser(this.newUser);
  }

  deleteUser(name: string) {
    let userIndex: number;
    userIndex = this.users.findIndex(user => user.name == name);
    this.db.deleteUser(this.docs[userIndex]);
    this.refreshComponent();
  }
  refreshComponent() {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/users']);
  });
  }


}
