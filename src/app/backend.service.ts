import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  tableData: String = ""
  constructor() { }

  setTableData(data: String) {
    this.tableData = data;
  }

  getTableData():Observable<String> {
    return of(this.tableData);
  }
}
