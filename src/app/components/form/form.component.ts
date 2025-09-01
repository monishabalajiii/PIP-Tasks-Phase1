// form.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-form',
    standalone: true,
  imports: [
     CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy  {

  
 userForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  showFormStatus = false;
  isSubmitting = false;
  lastSaved: Date | null = null;
  
  private destroy$ = new Subject<void>();
  private readonly STORAGE_KEY = 'userFormData';

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.createForm();
  }

  ngOnInit() {
    this.loadFormState();
    this.setupAutoSave();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', [
        Validators.required, 
        Validators.minLength(2), 
        Validators.pattern(/^[a-zA-Z\s]*$/)
      ]],
      lastName: ['', [
        Validators.required, 
        Validators.minLength(2), 
        Validators.pattern(/^[a-zA-Z\s]*$/)
      ]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [
        Validators.required, 
        Validators.pattern(/^\d{10}$/)
      ]],
      age: ['', [
        Validators.required, 
        Validators.min(18), 
        Validators.max(99)
      ]],
      country: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_])[A-Za-z\d@$!%*?&#_]{8,}$/
)
      ]],
      confirmPassword: ['', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      marketingEmails: [false]
    }, { 
      validators: this.passwordMatchValidator 
    });
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      if (confirmPassword?.hasError('passwordMismatch')) {
        confirmPassword.setErrors(null);
      }
      return null;
    }
  }

  private setupAutoSave() {
    this.userForm.valueChanges.pipe(
      debounceTime(1000),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.saveFormState();
    });
  }

  private saveFormState() {
    try {
      const formData = {
        ...this.userForm.value,
        password: '', // Don't persist passwords
        confirmPassword: ''
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(formData));
      this.lastSaved = new Date();
      
      // Auto-hide the saved notification after 3 seconds
      setTimeout(() => {
        this.lastSaved = null;
      }, 3000);
    } catch (error) {
      console.warn('Failed to save form state:', error);
    }
  }

  private loadFormState() {
    try {
      const savedData = localStorage.getItem(this.STORAGE_KEY);
      if (savedData) {
        const formData = JSON.parse(savedData);
        this.userForm.patchValue(formData);
      }
    } catch (error) {
      console.warn('Failed to load form state:', error);
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.snackBar.open('Form submitted successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        
        // Clear saved form state on successful submission
        localStorage.removeItem(this.STORAGE_KEY);
        this.lastSaved = null;
        
        console.log('Form Submitted:', this.userForm.value);
      }, 2000);
    } else {
      this.markFormGroupTouched();
      this.snackBar.open('Please fix the errors in the form', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }

  clearForm() {
    this.userForm.reset();
    localStorage.removeItem(this.STORAGE_KEY);
    this.lastSaved = null;
    this.snackBar.open('Form cleared', 'Close', {
      duration: 2000
    });
  }

  loadSampleData() {
    const sampleData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      age: 25,
      country: 'us',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      agreeToTerms: true,
      marketingEmails: false
    };
    
    this.userForm.patchValue(sampleData);
    this.snackBar.open('Sample data loaded', 'Close', {
      duration: 2000
    });
  }

  private markFormGroupTouched() {
    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.userForm.get(key);
      control?.markAsTouched();
    });
  }

}
