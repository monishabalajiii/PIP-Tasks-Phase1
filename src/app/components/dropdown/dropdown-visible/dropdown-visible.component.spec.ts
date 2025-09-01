import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownVisibleComponent } from './dropdown-visible.component';

describe('DropdownVisibleComponent', () => {
  let component: DropdownVisibleComponent;
  let fixture: ComponentFixture<DropdownVisibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownVisibleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownVisibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
