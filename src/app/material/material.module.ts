import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatBadgeModule,
} from "@angular/material";

const MaterialComponets = [
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatBadgeModule,
];

@NgModule({
  imports: [MaterialComponets],
  exports: [MaterialComponets],
})
export class MaterialModule {}
