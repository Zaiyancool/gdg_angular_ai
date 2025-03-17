import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiContentComponent } from './ai-content.component';

describe('AiContentComponent', () => {
  let component: AiContentComponent;
  let fixture: ComponentFixture<AiContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
