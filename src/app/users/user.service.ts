import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { User } from "./user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private userUrl = "http://localhost:3000/";

  constructor(private http: HttpClient) {}

  loginUser(payload: User): Observable<string> {
    return this.http.post<string>(this.userUrl + "login", payload);
  }
}
