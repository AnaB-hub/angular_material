import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import {
  MatSnackBar,
  MatDialog,
  MatTableDataSource,
  MatSort,
  MatPaginator,
} from "@angular/material";
import { DialogExampleComponent } from "./dialog-example/dialog-example.component";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" },
];
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ["position", "name", "weight", "symbol"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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

  numbers = [];

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {
    for (let i = 0; i < 1000; i++) {
      this.numbers.push(i);
    }
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
  }

  logData(row) {
    console.log(row);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
