import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGameTypeComponent } from './add-game-type.component';

describe('AddGameTypeComponent', () => {
  let component: AddGameTypeComponent;
  let fixture: ComponentFixture<AddGameTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddGameTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddGameTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
