import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.html',
  providers: [],
})
export class LoginPage {
  // messageService = inject();

  // user = {
  //   email: '',
  //   password: '',
  // };
  //
  // value: any;

  onSubmit(form: any) {
    if (form.valid) {
      form.resetForm();
    }
  }
}
