import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "angularMaterial";
  notification = 0;
  showSpinner = false;
  tst = true;
  selectedValue: string;
  opened = false;

  options: string[] = ["Angular", "React", "Vue"];
  objectOptions = [
    { name: "Angular" },
    { name: "Angular Material" },
    { name: "React" },
    { name: "Vue" },
  ];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((op) => op.toLowerCase().includes(filterValue));
  }

  loadData() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 5000);
  }

  log(state) {
    console.log(state);
  }

  logChange(index) {
    console.log(index);
  }

  displayFn(subject) {
    return subject ? subject.name : undefined;
  }
}
