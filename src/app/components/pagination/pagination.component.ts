import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
}

@Component({
  selector: 'app-pagination',
 standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

   displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'company'];
  dataSource: User[] = [];
  filteredData: User[] = [];
  isLoading = false;
  totalItems = 0;
  pageSize = 10;
  currentPage = 0;
  searchTerm = '';

  // Simple mock data
  private mockUsers: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", company: "Tech Corp" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "123-456-7891", company: "Design Studio" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "123-456-7892", company: "Marketing Plus" },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", phone: "123-456-7893", company: "Consulting Inc" },
    { id: 5, name: "David Brown", email: "david@example.com", phone: "123-456-7894", company: "Development LLC" },
    { id: 6, name: "Emily Davis", email: "emily@example.com", phone: "123-456-7895", company: "Creative Agency" },
    { id: 7, name: "Robert Miller", email: "robert@example.com", phone: "123-456-7896", company: "Finance Group" },
    { id: 8, name: "Lisa Anderson", email: "lisa@example.com", phone: "123-456-7897", company: "Legal Services" },
    { id: 9, name: "James Taylor", email: "james@example.com", phone: "123-456-7898", company: "Education Hub" },
    { id: 10, name: "Amanda White", email: "amanda@example.com", phone: "123-456-7899", company: "Healthcare Plus" },
    { id: 11, name: "Chris Lee", email: "chris@example.com", phone: "123-456-7800", company: "Real Estate Pro" },
    { id: 12, name: "Michelle Garcia", email: "michelle@example.com", phone: "123-456-7801", company: "Travel Solutions" },
    { id: 13, name: "Kevin Martinez", email: "kevin@example.com", phone: "123-456-7802", company: "Sports Management" },
    { id: 14, name: "Jennifer Rodriguez", email: "jennifer@example.com", phone: "123-456-7803", company: "Event Planning" },
    { id: 15, name: "Daniel Thompson", email: "daniel@example.com", phone: "123-456-7804", company: "Photography Studio" }
  ];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    
    setTimeout(() => {
      this.applyFilter();
      this.isLoading = false;
    }, 500);
  }

  applyFilter(): void {
    if (!this.searchTerm.trim()) {
      this.filteredData = [...this.mockUsers];
    } else {
      const searchLower = this.searchTerm.toLowerCase();
      this.filteredData = this.mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.company.toLowerCase().includes(searchLower)
      );
    }
    
    this.totalItems = this.filteredData.length;
    this.updatePageData();
  }

  updatePageData(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataSource = this.filteredData.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePageData();
  }

  onSearch(): void {
    this.currentPage = 0;
    this.applyFilter();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.currentPage = 0;
    this.applyFilter();
  }

  refreshData(): void {
    this.loadData();
  }

  // Helper method for template
  getEndIndex(): number {
    return Math.min((this.currentPage + 1) * this.pageSize, this.totalItems);
  }

}
