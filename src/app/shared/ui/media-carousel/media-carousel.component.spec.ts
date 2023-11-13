import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaCarouselComponent } from './media-carousel.component';

describe('MediaCarouselComponent', () => {
  let component: MediaCarouselComponent;
  let fixture: ComponentFixture<MediaCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MediaCarouselComponent]
    });
    fixture = TestBed.createComponent(MediaCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
