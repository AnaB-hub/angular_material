import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
} from "@angular/material";

const MaterialComponets = [
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
];

@NgModule({
  imports: [MaterialComponets],
  exports: [MaterialComponets],
})
export class MaterialModule {}
