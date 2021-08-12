import { Component, OnInit } from '@angular/core';
import {NzUploadFile} from "ng-zorro-antd/upload";
import {Router} from "@angular/router";
import {BackendService} from "../../backend.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  uploading = false;
  fileList: NzUploadFile[] = []

   reader = new FileReader()

  constructor(private router : Router, private service: BackendService) { }

  ngOnInit() {
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };


  handleUpload():void {

    this.reader.readAsText(this.fileList[0] as any, "UTF-8")


    this.reader.onload = (() => {
      if (this.reader.result) {

        //console.log(this.reader.result);

        //let lines = this.reader.result.toString().split(/\r?\n/)



        //let headerLine = lines.shift()

//        console.log(headerLine)


        this.service.setTableData(this.reader.result.toString())

        // @ts-ignore
        this.router.navigateByUrl("/welcome/show")

        /*
        lines.forEach(line => {
          console.log(line)
        })*/
      }
    });
  }

}
