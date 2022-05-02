import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterCookieComponent } from './ajouter-cookie.component';

describe('AjouterCookieComponent', () => {
  let component: AjouterCookieComponent;
  let fixture: ComponentFixture<AjouterCookieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterCookieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterCookieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
