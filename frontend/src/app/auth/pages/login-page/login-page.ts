import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    MessageModule,
    PasswordModule,
    FloatLabel,
  ],
  templateUrl: './login-page.html',
  providers: [MessageService],
})
export class LoginPage {
  messageService = inject(MessageService);

  user = {
    email: '',
    password: '',
  };

  value: any;

  onSubmit(form: any) {
    if (form.valid) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Form Submitted',
        life: 3000,
      });
      form.resetForm();
    }
  }
}
