import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortableThComponent } from './sortable-th.component';

describe('SortableThComponent', () => {
  let component: SortableThComponent;
  let fixture: ComponentFixture<SortableThComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortableThComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortableThComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
