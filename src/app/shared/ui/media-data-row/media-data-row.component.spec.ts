import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaDataRowComponent } from './media-data-row.component';

describe('MediaDataRowComponent', () => {
  let component: MediaDataRowComponent;
  let fixture: ComponentFixture<MediaDataRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MediaDataRowComponent]
    });
    fixture = TestBed.createComponent(MediaDataRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
