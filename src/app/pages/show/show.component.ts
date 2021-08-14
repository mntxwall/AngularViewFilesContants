import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {BackendService} from "../../backend.service";
import {
  GET_CURRENT, GET_PREVIOS,
  Headerindex,
  PhoneGeoHash,
  PhoneGeoHashDateTimeCounts,
  StayTime,
  ViewData
} from "../../headerindex";

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



  preCalculate: PhoneGeoHash = {phone:"", geohash:"", inDateTime: ""};
  currentCalculate: PhoneGeoHash = { phone: "", geohash: "", inDateTime: ""}


  resultPhonesGeoHashDataTime: PhoneGeoHashDateTimeCounts[] = []

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
    this.service.getTableData().subscribe(data => this.tableData = data);
  }

  analyseDataValues() {
    //把每一行都分出来
    let lines = this.tableData.split(/\r?\n/);
    let header = lines.shift();

    // @ts-ignore
    let tableColumns = header.split(',');

    tableColumns.forEach(column => {
      this.headers.push(column);
    });


    lines.forEach(line =>{

      let rowValues: string[] = [];

      line.split(',').forEach(data => rowValues.push(data));

      if (rowValues.length > 1) this.rows.push(rowValues);

    });

    this.rows.shift();

  }

  initNewPhoneGeoHashValue() {

    let currentPhoneGeoHashDateTime: PhoneGeoHashDateTimeCounts = {
      phone: this.currentCalculate.phone,
      geohash: this.currentCalculate.geohash,
      dateTimes: [],
      sumDateTimes: 0
    }

    let currentDateTime: StayTime = {
      start: this.currentCalculate.inDateTime,
      end: ""
    }

    currentPhoneGeoHashDateTime.dateTimes.push(currentDateTime);

    this.resultPhonesGeoHashDataTime.push(currentPhoneGeoHashDateTime)

  }

  calculateCurrentValue(type: number) {

    let findPhoneGeoHash = this.resultPhonesGeoHashDataTime.find(e => {
      if (type === GET_CURRENT)
        return (e.phone === this.currentCalculate.phone && e.geohash === this.currentCalculate.geohash)
      else
        return (e.phone === this.preCalculate.phone && e.geohash === this.preCalculate.geohash)
    });
    if (findPhoneGeoHash != null){

      findPhoneGeoHash.sumDateTimes +=
        Math.round(Math.abs((new Date(this.currentCalculate.inDateTime).getTime() - new Date(this.preCalculate.inDateTime).getTime()))/(1000 * 60));
      let findPhoneGeoHashDateTimeArrays = findPhoneGeoHash.dateTimes[findPhoneGeoHash.dateTimes.length - 1]
      findPhoneGeoHashDateTimeArrays.end = this.currentCalculate.inDateTime;
    }
  }

  handleDate() {

    //记录下需要处理的列号，用表头的对应关系来确定列号
    let headerIndex = {} as Headerindex;

    headerIndex.numberIndex = this.headers.indexOf(this.selectedNumbers);
    headerIndex.dateIndex = this.headers.indexOf(this.selectedDateTime);
    headerIndex.geohashIndex = this.headers.indexOf(this.selectedGEOHASH);



    // @ts-ignore
    this.rows.forEach(row=> {

      //console.log(row);
      let tmp: ViewData = {
        phone: row[headerIndex.numberIndex].trim(),
        inDateTime: row[headerIndex.dateIndex].trim(),
        geohash: row[headerIndex.geohashIndex].trim()
      }


      //当前值
      this.currentCalculate.phone = row[headerIndex.numberIndex].trim();
      this.currentCalculate.geohash = row[headerIndex.geohashIndex].trim();
      this.currentCalculate.inDateTime = row[headerIndex.dateIndex].trim();

      //first init
      if(this.preCalculate.phone === "" && this.preCalculate.geohash === ""){

        this.preCalculate.phone = row[headerIndex.numberIndex].trim();
        this.preCalculate.geohash = row[headerIndex.geohashIndex].trim();
        this.preCalculate.inDateTime = row[headerIndex.dateIndex].trim();

        this.initNewPhoneGeoHashValue();

      }

      if (this.currentCalculate.phone === this.preCalculate.phone &&
        this.currentCalculate.geohash === this.preCalculate.geohash ){
        //find the array index and caculate the date
        this.calculateCurrentValue(GET_CURRENT)

      }
      else if (this.currentCalculate.geohash !== this.preCalculate.geohash){

        /*
        * 如果geohash发生了变化 ，那么在结果集中找cur的值，如果没有找到就是新的一条记录，需要init，
        * 找到的话则是新的一段时间的开始，需要把时间参与上一条的计算
        * */
        let findPhoneGeoHash = this.resultPhonesGeoHashDataTime.find(e => {
          return (e.phone === this.currentCalculate.phone && e.geohash === this.currentCalculate.geohash)
        });
        if (findPhoneGeoHash == null) {
          this.initNewPhoneGeoHashValue();
        }
        else {
          let currentDateTime: StayTime = {
            start: this.currentCalculate.inDateTime,
            end: ""
          }
          findPhoneGeoHash.dateTimes.push(currentDateTime)

          //如果发生了切换，把切换的时间当成号码在上一个geohash中的时间

          this.calculateCurrentValue(GET_PREVIOS)

        }
      }


      this.preCalculate.inDateTime = this.currentCalculate.inDateTime;
      this.preCalculate.phone = this.currentCalculate.phone;
      this.preCalculate.geohash = this.currentCalculate.geohash;

      this.viewDates.push(tmp);

    });

    this.service.setViewData(this.viewDates);

    //

    //console.log(this.viewDates);

    console.log(this.resultPhonesGeoHashDataTime)

  }

}
