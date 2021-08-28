import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPageComponent } from './marketPage.component';

describe('MarketPageComponent', () => {
  let component: MarketPageComponent;
  let fixture: ComponentFixture<MarketPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
