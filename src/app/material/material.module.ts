import { NgModule } from "@angular/core";
import { MatButtonModule, MatButtonToggleModule } from "@angular/material";

const MaterialComponets = [MatButtonModule, MatButtonToggleModule];

@NgModule({
  imports: [MaterialComponets],
  exports: [MaterialComponets],
})
export class MaterialModule {}
