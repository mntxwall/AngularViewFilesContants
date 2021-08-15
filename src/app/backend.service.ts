import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {PhoneGeoHashDateTimeCounts, ViewData} from "./headerindex";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  tableData: string = "";
  headers : string[] = [];

  resultPhonesGeoHashDataTime: PhoneGeoHashDateTimeCounts[] = []

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


}
