import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {BackendService} from "../../backend.service";
import {Headerindex, ViewData} from "../../headerindex";

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

  viewDates: ViewData[] = [];

  selectedValue = null;

  //listOfTagOptions:Event

  selectedNumbers: string = "";
  selectedDateTime: string = "";

  selectedGEOHASH: string = "";


  constructor(private router:Router, private service: BackendService) {
  }

  ngOnInit(): void {

    this.getUpdateTextViews();

    if (this.tableData === ""){
      this.router.navigateByUrl("/")
    }
    else {
      //console.log(this.tableData);
      this.analyseDataValues();

      //console.log(this.rows)
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

    //记录下需要处理的列号，用表头的对应关系来确定列号
    let headerIndex = {} as Headerindex;

    headerIndex.numberIndex = this.headers.indexOf(this.selectedNumbers);
    headerIndex.dateIndex = this.headers.indexOf(this.selectedDateTime);
    headerIndex.geohashIndex = this.headers.indexOf(this.selectedGEOHASH);

    // @ts-ignore
    this.rows.forEach(row=> {
      let tmp: ViewData = {
        phone: row[headerIndex.numberIndex].trim(),
        inDateTime: row[headerIndex.dateIndex].trim(),
        geohash: row[headerIndex.geohashIndex].trim()
      }

      this.viewDates.push(tmp);

    });

    this.service.setViewData(this.viewDates)

    console.log(this.viewDates)

    //console.log(headerIndex)

  }

}
