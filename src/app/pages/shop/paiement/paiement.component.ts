import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: 'app-cookies',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {
  succesAddCookie : boolean = false;
  interval : any;
  form! : FormGroup;
  constructor(private dialogRef: MatDialogRef<PaiementComponent>,
            @Inject(MAT_DIALOG_DATA) public total : any,
            private fb : FormBuilder,) 
  { 
  }

  ngOnInit(): void {
    this.form = this.fb.group({
        numero: [null,[Validators.required,Validators.maxLength(16),Validators.minLength(16)]],
        date: ['',Validators.required],
        crypto : [null,[Validators.minLength(3),Validators.maxLength(3)]]
        });
  }

  isValid() : boolean {
    return this.form.valid && this.form.get("numero")!.value.toString().length==16 && this.form.get('date')!.value && this.form.get('crypto')!.value;
  }

  onSubmit(){
      this.dialogRef.close(true);

  }
}