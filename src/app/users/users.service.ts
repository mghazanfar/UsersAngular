import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IUsers } from "./users";

@Injectable()
export class UsersServices {
  private url: string = "https://api.github.com/users?since=135";

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<IUsers[]>(this.url);
  }
}
