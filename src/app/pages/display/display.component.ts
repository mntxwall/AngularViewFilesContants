import { Component, OnInit } from '@angular/core';
import {BackendService} from "../../backend.service";
import {PhoneGeoHashDateTimeCounts, StayTime} from "../../headerindex";
import {Router} from "@angular/router";

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  displayPhonesGeoHashDataTime: PhoneGeoHashDateTimeCounts[] = [];
  expandSet = new Set<string>();

  //expandGeoHashDateTimes: StayTime[] | undefined = [];

  constructor(private router:Router, private service: BackendService) { }

  ngOnInit(): void {
   this.service.getResultPhoneGeoHashDataTime().subscribe(data => {
     this.displayPhonesGeoHashDataTime = data;

     this.displayPhonesGeoHashDataTime.sort((a, b) => (a.sumDateTimes > b.sumDateTimes) ? -1 : 1);

     //时间段进行排序
     this.displayPhonesGeoHashDataTime.forEach(t =>{
       t.dateTimes.sort((a, b) => (a.interval > b.interval) ? -1 : 1)
     });

   });


   if (this.displayPhonesGeoHashDataTime.length <= 1){

     // @ts-ignore
     this.router.navigateByUrl("/");
   }

    //console.log(this.service.getResultPhoneGeoHashDataTime())
  }

  onExpandChange(geohash: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(geohash);
      //this.expandGeoHashDateTimes = this.displayPhonesGeoHashDataTime.find(e => e.geohash === geohash)?.dateTimes;

    } else {
      this.expandSet.delete(geohash);
      //this.expandGeoHashDateTimes = [];
    }
  }

  exportData(): void {

    console.log(this.displayPhonesGeoHashDataTime);

    let str="你,我,他\r\nD,E,F";
    let exportCsvString = "号码,GEOHASH,停留总时长,开始时间,结束时间,停留区间时长\r\n";

    this.displayPhonesGeoHashDataTime.forEach(row => {
      row.dateTimes.forEach(dates =>{
        exportCsvString += row.phone + "," + row.geohash + "," + row.sumDateTimes + "," +
          dates.end.toString() + "," + dates.start + "," + dates.interval + "\r\n";
      });
    });

    const blob = new Blob([ "\uFEFF" + exportCsvString], { type: 'text/csv;charset=GBK;' });

    const a = document.createElement('a');

    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = Date.now().toString() + '.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();

  }

}
