import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaDataCardComponent } from './media-data-card.component';

describe('MediaDataCardComponent', () => {
  let component: MediaDataCardComponent;
  let fixture: ComponentFixture<MediaDataCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MediaDataCardComponent]
    });
    fixture = TestBed.createComponent(MediaDataCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
