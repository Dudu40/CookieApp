import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-cookie',
  templateUrl: './info-cookie.component.html',
  styleUrls: ['./info-cookie.component.scss']
})
export class InfoCookieComponent implements OnInit {
  form! : FormGroup;
  selectedImage :any;
  isUrlValid : boolean = true;
  succes : boolean = false;
  constructor(private dialogRef: MatDialogRef<InfoCookieComponent>,
              @Inject(MAT_DIALOG_DATA) public cookie : any,
              private http :HttpClient) { }

  ngOnInit(): void {
    console.log(this.cookie);
  }

  onSubmit(){
    this.dialogRef.close();
  }


}
