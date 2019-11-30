import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore
  ) {}
  //Crea un nuevo gato
  public createCat(data: {nombre: string, url: string}) {
    return this.firestore.collection('prueba').add(data);
  }
  //Obtiene un gato
  public getCat(documentId: string) {
    return this.firestore.collection('prueba').doc(documentId).snapshotChanges();
  }
  //Obtiene todos los gatos
  public getCats() {
    return this.firestore.collection('prueba').snapshotChanges();
  }
  //Actualiza un gato
  public updateCat(documentId: string, data: any) {
    return this.firestore.collection('prueba').doc(documentId).set(data);
  }

  // Get Page info
  public getPage() {
    return this.firestore.collection('pages').doc('1').snapshotChanges();
  }

  // Set Page info
  public setPage(dashboard: boolean, users: boolean, data_usage: boolean) {
    return this.firestore.collection('pages').doc('1').update({'dashboard': dashboard, 'users': users, 'data_usage':data_usage});
  }
  // Get Users
  public getUsers(){
    return this.firestore.collection('users').snapshotChanges();
  }
  // Set User
  public setUser(data: any) {
    return this.firestore.collection('users').add({'name':data.name, 'email': data.email, 'status': data.status, 'last': data.last, 'photoUrl': ''});
  }
  // Update User
  public updateUser(documentId: string, data: any){
    return this.firestore.collection('users').doc(documentId).update(data);
  }
  // Delete User
  public deleteUser(documentId: string){
    return this.firestore.collection('users').doc(documentId).delete();
  }

}