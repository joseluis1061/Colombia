import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPlacesComponent } from './menu-places.component';

describe('MenuPlacesComponent', () => {
  let component: MenuPlacesComponent;
  let fixture: ComponentFixture<MenuPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuPlacesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
