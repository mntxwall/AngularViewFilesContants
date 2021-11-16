import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Headerindex, PhoneGeoHashDateTimeCounts, ViewData} from "./headerindex";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  tableData: string = "";
  headers : string[] = [];

  resultPhonesGeoHashDataTime: PhoneGeoHashDateTimeCounts[] = [];

  tripPhoneGeoHashDataTime: PhoneGeoHashDateTimeCounts[] = [];

  constructor() { }

  setTableData(data: string) {
    this.tableData = data;
  }

  getTableData():Observable<string> {
    return of(this.tableData);
  }

  setResultPhoneGeoHashDataTime(data: PhoneGeoHashDateTimeCounts[]) {
    this.resultPhonesGeoHashDataTime = data;
  }

  getResultPhoneGeoHashDataTime(): Observable<PhoneGeoHashDateTimeCounts[]>{
    return of(this.resultPhonesGeoHashDataTime)
  }

  setTripPhoneGeoHashDataTime(data: PhoneGeoHashDateTimeCounts[]) {
    this.tripPhoneGeoHashDataTime = data;
  }

  getTripPhoneGeoHashDataTime(): Observable<PhoneGeoHashDateTimeCounts[]>{
    return of(this.tripPhoneGeoHashDataTime)
  }

  // @ts-ignore
  setRelationDate(rows: string[string[]], headerindex: Headerindex){
    console.log(rows)
    console.log(headerindex)
  }


}
