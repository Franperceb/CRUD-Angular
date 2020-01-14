import { ApiResponse } from './model/api.response';
import { User } from './model/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/index";
 
@Injectable({
  providedIn: 'root'
})

export class ApiService {
  url: string = 'https://jsonplaceholder.typicode.com/users/';
    constructor(private httpClient : HttpClient) { }
  
  getUsers(){
    return this.httpClient.get(this.url);
  }
  getUserById(id){
    return this.httpClient.get(this.url + id);
  }

  createUser(user: User):Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.url, user);
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.httpClient.put<ApiResponse>(this.url + user.id, user);
  }
  deleteUser(id: number): Observable<ApiResponse> {
    return this.httpClient.delete<ApiResponse>(this.url + id);
  }
}
