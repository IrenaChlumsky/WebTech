import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private backendUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  // Alle User abrufen
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.backendUrl}/users`);
  }

  // Neuen User erstellen
  createNewUser(user: User): Observable<User> {
     let endpoint = '/users';
    return this.http.post<User>(`${this.backendUrl}/users`, user);
  }

  // Einen User nach Name abrufen
  getUserByName(name: string): Observable<User> {
    return this.http.get<User>(`${this.backendUrl}/users/${name}`);
  }

  // User löschen
  deleteOneMember(id: string): Observable<any> {
    return this.http.delete<any>(`${this.backendUrl}/users/${id}`);
  }

  // User aktualisieren
  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.backendUrl}/users/${id}`, user);
  }
}
