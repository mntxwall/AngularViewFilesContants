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
  fileList: NzUploadFile[] = [];

  reader = new FileReader();

   isLoading = false;

  constructor(private router : Router, private service: BackendService) { }

  ngOnInit() {

    const inventory = [
      {name: 'apples', quantity: 2},
      {name: 'bananas', quantity: 0},
      {name: 'cherries', quantity: 5},
      {name: 'apples', quantity: 10}
    ];
    console.log(inventory.find(e => {
      return (e.name === 'apples' && e.quantity === 10)
    }));
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };


  handleUpload():void {
    this.isLoading = true;

    //防止页面卡住，无法显示加载按钮
    setTimeout(() => {
      this.reader.readAsText(this.fileList[0] as any, "GBK");
    }, 500);

    this.reader.onload = (() => {
      if (this.reader.result) {
        this.service.setTableData(this.reader.result.toString());
        // @ts-ignore
        this.router.navigateByUrl("/welcome/show")
      }
    });
  }

}
