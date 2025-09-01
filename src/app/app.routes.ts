import { Routes } from '@angular/router';
import { PricingTableComponent } from './components/pricing-table/pricing-table.component';
import { DropdownVisibleComponent } from './components/dropdown/dropdown-visible/dropdown-visible.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { FormComponent } from './components/form/form.component';
import { PaginationComponent } from './components/pagination/pagination.component';

export const routes: Routes = [
  { path: '', redirectTo: '/pricing-table', pathMatch: 'full' },
  { path: 'pricing-table', component: PricingTableComponent },
  { path: 'dropdown', component: DropdownVisibleComponent },
  { path: 'form', component: FormComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'pagination', component: PaginationComponent },
];
