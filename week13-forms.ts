import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

export interface IRegistrationData {
  fullName: string;
  email: string;
  phone: string;
  membershipType: 'Silver' | 'Gold' | 'Platinum';
  favCategory: string;
  agreeTerms: boolean;
}

/**
 * Week 13: Angular Forms & Validation
 * Demonstrates:
 * 1. Template-Driven Angular Form with [(ngModel)] and #regForm="ngForm"
 * 2. Form control state diagnostics:
 *    - valid / invalid
 *    - touched / untouched
 *    - dirty / pristine
 * 3. Validation constraints:
 *    - required
 *    - minlength (3 characters)
 *    - email validation pattern
 *    - phone regex pattern (10 digits)
 * 4. Conditional error alerts (*ngIf="control.invalid && control.touched")
 * 5. Submit event handling with form reset
 */
@Component({
  selector: 'app-week13-forms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './week13.html',
  styleUrls: ['./style.css']
})
export class Week13Component {
  formData: IRegistrationData = {
    fullName: '',
    email: '',
    phone: '',
    membershipType: 'Gold',
    favCategory: 'Hot Coffee',
    agreeTerms: false
  };

  submittedData: IRegistrationData[] = [
    {
      fullName: 'Aarav Sharma',
      email: 'aarav@example.com',
      phone: '9876543210',
      membershipType: 'Platinum',
      favCategory: 'Hot Coffee',
      agreeTerms: true
    }
  ];

  submissionSuccess: boolean = false;

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.submittedData.unshift({ ...this.formData });
      this.submissionSuccess = true;
      alert(`✅ Registration Successful for ${this.formData.fullName}!\nMembership tier: ${this.formData.membershipType}`);
      
      // Reset form
      form.resetForm({
        membershipType: 'Gold',
        favCategory: 'Hot Coffee',
        agreeTerms: false
      });
    }
  }
}
