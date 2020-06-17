import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material";

const MaterialComponets = [MatButtonModule];

@NgModule({
  imports: [MaterialComponets],
  exports: [MaterialComponets],
})
export class MaterialModule {}
