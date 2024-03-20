import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValuesFromArray, catchError } from 'rxjs';
import  User  from '../user';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http:HttpClient) { }
  private _url = "http://localhost:5000/register";
  private _urll = "http://localhost:5000/login";
  private _urlgetAllUsers = "http://localhost:5000/getAllUsers";
  private _urlProfile= "http://localhost:5000/profile";
  private _userDeleteUrl= "http://localhost:5000/user";
  private _userUpdateUrl= "http://localhost:5000/update";

  register(user: User): Observable<User>{
    console.log("Service is called");
    return this.http.post<User>(this._url,user);
  }
  login(user: User): Observable<any>{
    console.log("User login success");
    return this.http.post<any>(this._urll,user);
  }
  getUsers():Observable<User>{
    return this.http.get<any>(this._urlgetAllUsers)
  }
  getProfile(formData:FormData):Observable<any>{
    console.log("Profile")
    return this.http.post<any>(this._urlProfile,formData);
  }
  deleteUser(id:any):Observable<any>{
    return this.http.delete<any>(`${this._userDeleteUrl}/${id}`);
  }
  updateUser(id:any,email:any,name:any):Observable<any>{
    console.log(id);
    const body = { email, name };
    return this.http.put<any>(`${this._userUpdateUrl}/${id}`,body);
  }
}
