import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetaquoteComponent } from './getaquote.component';

describe('GetaquoteComponent', () => {
  let component: GetaquoteComponent;
  let fixture: ComponentFixture<GetaquoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetaquoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetaquoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
