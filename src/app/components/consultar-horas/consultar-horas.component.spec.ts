import { ServicioService } from './../../services/servicio.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ConsultarHorasComponent } from './consultar-horas.component';
import { of, throwError } from 'rxjs';

describe('ConsultarHorasComponent', () => {
  let component: ConsultarHorasComponent;
  let fixture: ComponentFixture<ConsultarHorasComponent>;
  let servicioService: ServicioService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarHorasComponent ],
      imports: [FormsModule,  ReactiveFormsModule, HttpClientTestingModule],
      providers: [ServicioService]
    })
    .compileComponents();
    servicioService = TestBed.inject(ServicioService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validar buscar horas por semana', () => {
    component.profileForm.get('idTecnico').setValue('a');
    component.profileForm.get('semana').setValue(39);
    const servicioSpy = spyOn(servicioService, 'consultarHoras').withArgs('a', 39).and.returnValue(of(true));
    component.onSubmit();
    expect(servicioService.consultarHoras).toHaveBeenCalledTimes(1);
  });

  it('validar buscar horas por semana', () => {
    component.profileForm.get('idTecnico').setValue('a');
    component.profileForm.get('semana').setValue(39);
    const servicioSpy = spyOn(servicioService, 'consultarHoras').withArgs('a', 39).and.returnValue(throwError({error: 'Error'}));
    component.onSubmit();
    expect(servicioService.consultarHoras).toHaveBeenCalledTimes(1);
    expect(component.error).toBeTruthy();
  });
});
