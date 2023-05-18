import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPageComponent } from './crud-page.component';

describe('CrudPageComponent', () => {
  let component: CrudPageComponent;
  let fixture: ComponentFixture<CrudPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudPageComponent]
    });
    fixture = TestBed.createComponent(CrudPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
