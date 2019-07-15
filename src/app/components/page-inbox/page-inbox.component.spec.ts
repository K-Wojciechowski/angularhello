import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInboxComponent } from './page-inbox.component';

describe('PageInboxComponent', () => {
  let component: PageInboxComponent;
  let fixture: ComponentFixture<PageInboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageInboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
