import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { MatSnackBar, MatDialog } from "@angular/material";
import { DialogExampleComponent } from "./dialog-example/dialog-example.component";

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

  minDate = new Date();
  maxDate = new Date(2020, 5, 24);

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogExampleComponent, {
      data: { name: "Ana" },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  dateFilter = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

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

  openSnackBar(message, action) {
    let snackBarRef = this.snackBar.open(message, action, { duration: 2000 });

    snackBarRef.afterDismissed().subscribe(() => {
      console.log("The snackbar was dismissed");
    });

    snackBarRef.onAction().subscribe(() => {
      console.log("The snackbar action was triggered");
    });
  }

  openCustomSnackBar() {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {
      duration: 2000,
    });
  }
}

@Component({
  selector: "custom-snackbar",
  template: `<span style="color: orange">Custom Snackbar</span>`,
})
export class CustomSnackBarComponent {}
