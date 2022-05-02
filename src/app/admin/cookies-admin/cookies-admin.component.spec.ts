import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesAdminComponent } from './cookies-admin.component';

describe('CookiesAdminComponent', () => {
  let component: CookiesAdminComponent;
  let fixture: ComponentFixture<CookiesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookiesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
