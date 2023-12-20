import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipListComponent } from './chip-list.component';

describe('ChipListComponent', () => {
  let component: ChipListComponent;
  let fixture: ComponentFixture<ChipListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChipListComponent]
    });
    fixture = TestBed.createComponent(ChipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
