import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {BackendService} from "../../backend.service";

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  tableData: string = "";
  headers : string[] = [];

  // @ts-ignore
  rows : string[string[]] = [[]];

  selectedValue = null;

  //listOfTagOptions:Event

  selectedHeaders:string[] = [];



  constructor(private router:Router, private service: BackendService) {
  }

  ngOnInit(): void {

    this.getUpdateTextViews();

    if (this.tableData === ""){
      this.router.navigateByUrl("/")
    }
    else {
      console.log(this.tableData);
      this.analyseDataValues();

      console.log(this.rows)
    }
  }

  getUpdateTextViews() {
    this.service.getTableData().subscribe(data => this.tableData = data)
  }

  analyseDataValues() {
    //把每一行都分出来
    let lines = this.tableData.split(/\r?\n/);
    let header = lines.shift();

    // @ts-ignore
    let tableColumns = header.split(',');

    tableColumns.forEach(column => {
      this.headers.push(column)
    });


    lines.forEach(line =>{

      let rowValues: string[] = [];

      line.split(',').forEach(data => rowValues.push(data));

      this.rows.push(rowValues)

    });

    this.rows.shift()

  }

  handleDate() {

    console.log(this.selectedHeaders)

  }

}
