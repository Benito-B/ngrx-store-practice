import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { User } from "./user.model";
import { LoggedUser } from "./logged-user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private userUrl = "http://51.75.163.52:3000/";

  constructor(private http: HttpClient) {}

  loginUser(payload: User): Observable<LoggedUser> {
    return this.http.post<LoggedUser>(this.userUrl + "login", payload);
  }
}
