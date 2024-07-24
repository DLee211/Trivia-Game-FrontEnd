import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGameTypeDialogComponent } from './add-game-type-dialog.component';

describe('AddGameTypeDialogComponent', () => {
  let component: AddGameTypeDialogComponent;
  let fixture: ComponentFixture<AddGameTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddGameTypeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddGameTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
