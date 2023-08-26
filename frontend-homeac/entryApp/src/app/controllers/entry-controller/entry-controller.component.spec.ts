import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryControllerComponent } from './entry-controller.component';

describe('EntryControllerComponent', () => {
  let component: EntryControllerComponent;
  let fixture: ComponentFixture<EntryControllerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntryControllerComponent]
    });
    fixture = TestBed.createComponent(EntryControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
