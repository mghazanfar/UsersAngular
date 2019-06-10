import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import axios from "axios";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.scss"]
})
export class UserDetailComponent implements OnInit {
  public detail: { login: string; id: string }[] = [{ login: "", id: "" }];
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");

    axios
      .get(`https://api.github.com/users/${id}`)
      .then(res => {
        this.detail = [res.data];
      })
      .catch(err => {});
  }
}
