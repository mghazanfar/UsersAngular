import { NgModule } from "@angular/core";
import {
  MatCardModule,
  MatButtonModule,
  MatInputModule
} from "@angular/material";

@NgModule({
  imports: [MatCardModule, MatButtonModule, MatInputModule],
  exports: [MatCardModule, MatButtonModule, MatInputModule]
})
export class MaterialComponents {}
