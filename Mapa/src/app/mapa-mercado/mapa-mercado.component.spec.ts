import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaMercadoComponent } from './mapa-mercado.component';

describe('MapaMercadoComponent', () => {
  let component: MapaMercadoComponent;
  let fixture: ComponentFixture<MapaMercadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaMercadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaMercadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
