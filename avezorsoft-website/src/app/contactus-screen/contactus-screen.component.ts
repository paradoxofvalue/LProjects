import { Component, OnInit } from "@angular/core";

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

declare const fbq: any;

@Component({
  selector: "app-contactus-screen",
  templateUrl: "./contactus-screen.component.html",
  styleUrls: ["./contactus-screen.component.scss"],
  providers: [ErrorStateMatcher]
})
export class ContactusScreenComponent implements OnInit {
  constructor(private http: HttpClient) {}
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  pending: boolean = false;
  submitMessage: string = "Wait";
  submitStatus: string = "...";

  nameFormControl = new FormControl("", [Validators.required]);

  messageFormControl = new FormControl("", [Validators.required]);

  matcher = new MyErrorStateMatcher();

  ngOnInit() {}

  onSubmit() {
    const captcha = <HTMLElement>document.querySelector('#captcha');
    const button = <HTMLElement>document.querySelector('#captcha-submit');

    if (
      this.emailFormControl.valid &&
      this.messageFormControl.valid &&
      this.nameFormControl.valid
    ) {
      if (captcha.getAttribute('data-valid') && captcha.getAttribute('data-valid') === 'true') {
        this.pending = true;

        fbq("track", "CompleteRegistration");

        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
          })
        };
        const postUrl = '/index.php';
        this.http.post(postUrl, {
          name: this.nameFormControl.value,
          email: this.emailFormControl.value,
          message: this.messageFormControl.value
        }, httpOptions).subscribe((response: any) => {
          if (response.status) {
            this.submitMessage = response.message;
            this.submitStatus = '✓';
          } else {
            this.submitMessage = response.message;
            this.submitStatus = '×';
          }
        });
        // this.http
        //   .get(
        //     "/index.php?email=" +
        //       this.emailFormControl.value +
        //       "&name=" +
        //       this.nameFormControl.value +
        //       "&message=" +
        //       this.messageFormControl.value
        //   )
        //   .subscribe((response: any) => {
        //     if (response.status) {
        //       this.submitMessage = response.message;
        //       this.submitStatus = "✓";
        //     } else {
        //       this.submitMessage = response.message;
        //       this.submitStatus = "×";
        //     }
        //   });
      } else {
        captcha.style.display = 'block';
        button.style.display = 'none';
      }
    }
  }
}
