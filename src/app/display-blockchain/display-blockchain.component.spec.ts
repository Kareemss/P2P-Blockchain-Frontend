import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBlockchainComponent } from './display-blockchain.component';

describe('DisplayBlockchainComponent', () => {
  let component: DisplayBlockchainComponent;
  let fixture: ComponentFixture<DisplayBlockchainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayBlockchainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayBlockchainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
