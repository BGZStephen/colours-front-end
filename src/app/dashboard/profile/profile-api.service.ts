import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http"
import { environment } from "../../../environments/environment"

@Injectable()
export class ProfileApiService {

  constructor(
    private http: Http
  ) { }

  // user services

  user: any;
  authToken: any;
  baseUrl: string = environment.coloursApiUrl

  getCurrentUser() {
    this.loadToken()
    let token = localStorage.getItem('token')
    let headers = new Headers()
    headers.append('Authorization', `${token}`)
    let userId = JSON.parse(this.user)._id
    return this.http.get(`${this.baseUrl}/users/${userId}`, {headers: headers})
    .map(res => res.json())
  }

  loadToken() {
    this.authToken = localStorage.getItem('token')
    this.user = localStorage.getItem('user')
  }

  updateProfile(userObject) {
    this.loadToken()
    let token = localStorage.getItem('token')
    let headers = new Headers()
    headers.append('Authorization', `${token}`)
    userObject._id = JSON.parse(this.user)._id
    return this.http.post(this.baseUrl + "/users/update", userObject, {headers: headers})
    .map(res => res.json())
  }

  updatePassword(userObject) {
    this.loadToken()
    let token = localStorage.getItem('token')
    let headers = new Headers()
    headers.append('Authorization', `${token}`)
    userObject._id = JSON.parse(this.user)._id
    return this.http.post(this.baseUrl + "/users/updatePassword", userObject, {headers: headers})
    .map(res => res.json())
  }

}
