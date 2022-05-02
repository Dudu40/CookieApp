import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ajouter-cookie',
  templateUrl: './ajouter-cookie.component.html',
  styleUrls: ['./ajouter-cookie.component.scss']
})
export class AjouterCookieComponent implements OnInit {
  form! : FormGroup;
  selectedImage :any;
  isUrlValid : boolean = true;
  succes : boolean = false;
  constructor(private dialogRef: MatDialogRef<AjouterCookieComponent>,
              private fb:FormBuilder,
              private http :HttpClient) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      prix: [0,Validators.required],
      image: ['',Validators.required],
      desc: ['',Validators.required],
      });
  }

  // selectImage(event:any){
  //   if (event.target.files.length>0){
  //     const file =event.target.files[0];
  //     if (file){
  //       const reader = new FileReader();
  //       reader.onload=()=>{
  //         this.selectedImage=reader.result as string;
  //       }
  //       reader.readAsDataURL(file);
  //     }
  //   }
  // }

  checkImageUrl(url:string){
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onload = () => {
      this.isUrlValid=request.status==200;
  };
  }

  isValid():boolean{
    return this.form.valid;
  }

  onSubmit(){
    if (this.form.valid){
      this.checkImageUrl(this.form.get("image")?.value);
      let json = {nom :this.form.get("nom")?.value,
      prix : this.form.get("prix")?.value,
      image:this.form.get("image")?.value,
      desc : this.form.get("desc")?.value}
      const fd = new FormData();

      this.http.post(environment.SERVEUR_URL+"addCookie",json).subscribe(
      res=>{
      console.log("ajout réussi",res);
      }
      );
      this.succes=true;
      this.dialogRef.close(this.succes);
    }
  }

}
