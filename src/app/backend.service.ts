import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {ViewData} from "./headerindex";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  tableData: string = "";
  headers : string[] = [];

  viewDatas: ViewData[] = [];

  constructor() { }

  setTableData(data: string) {
    this.tableData = data;
  }

  getTableData():Observable<string> {
    return of(this.tableData);
  }

  setViewData(data: ViewData[]) {
    this.viewDatas = data;
  }

}
