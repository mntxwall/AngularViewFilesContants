import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {BackendService} from "../../backend.service";
import {
  GET_CURRENT, GET_PREVIOS,
  Headerindex,
  PhoneGeoHash,
  PhoneGeoHashDateTimeCounts, PhoneGeoHashNameCount, RowData,
  StayTime,
  ViewData
} from "../../headerindex";

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})

export class ShowComponent implements OnInit {


  isCalculate:boolean = false;
  //用于显示导入文本的数据
  tableData: string = "";

  //用于存储导入的文本数据中分析出来的表头
  headers : string[] = [];

  //rows表示根据换行符解析出来的每行.
  // 每行中又要string数组，根据逗号解析出来的每个字段
  // @ts-ignore
 // rows : string[string[]] = [[]];

  rows: RowData[] = [];

  // @ts-ignore
 // displayRows: string[string[]] = [[]];

  displayRows: RowData[] = [];

//  viewDates: ViewData[] = [];

//  selectedValue = null;

  //listOfTagOptions:Event

  //三个selectd，用于表示用户选择这三个表头使用的字段
  selectedNumbers: string = "已方号码";
  selectedPeer: string = "对方号码";



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
      this.rows.pop();


     this.displayRows = this.rows.slice(0, 5);


      //console.log(this.rows)
    }
  }

  getUpdateTextViews() {
    this.service.getTableData().subscribe(data => this.tableData = data);
  }

  analyseDataValues() {
    //把每一行都分出来
    let lines = this.tableData.split(/\r?\n/);
    let header = lines.shift();

    //再分出每一行的每个字段
    // @ts-ignore
    let tableColumns = header.split(',');

    tableColumns.forEach(column => {
      this.headers.push(column);
    });


    lines.forEach(line =>{

      //去掉双引号
      //let rowValues: string[] = [];

      let rowValue: RowData = {} as RowData
      line.split(',').forEach((data,i) => {

        let tmp = data;
        tmp = tmp.substr(0, 1) === "\"" ? tmp.substring(1, tmp.length - 1).trim() : tmp.trim();
        tmp = tmp.substr(-1, 1) === "\"" ? tmp.substring(0, tmp.length - 1).trim() : tmp.trim();
        //rowValues.push(tmp);
        if (i === 0)
          rowValue.usernum = tmp;
        else rowValue.peernum = tmp;

      });
      //if (rowValue.length > 1)
        this.rows.push(rowValue);

    });
    //

  }

  handleDate() {

    this.isCalculate = true;

    //记录下需要处理的列号，用表头的对应关系来确定列号
    let headerIndex = {} as Headerindex;

    //已经号码在上传数据中对应的列序列
    headerIndex.numberIndex = this.headers.indexOf(this.selectedNumbers);
    //对方号码在上传数据中对应的列序列
    headerIndex.peerIndex = this.headers.indexOf(this.selectedPeer);

    setTimeout(() => {

      this.service.setRelationDate(this.rows, headerIndex);

    }, 500);
    //this.service.setViewData(this.viewDates);
    //
    //console.log(this.viewDates);

  }

}
