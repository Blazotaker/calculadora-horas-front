import { ServicioService } from './../../services/servicio.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarServicioComponent } from './agregar-servicio.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Servicio } from 'src/app/model/servicio.model';
import { of } from 'rxjs';

describe('AgregarServicioComponent', () => {
  let component: AgregarServicioComponent;
  let fixture: ComponentFixture<AgregarServicioComponent>;
  let servicioService: ServicioService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarServicioComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [ServicioService]
    })
      .compileComponents();
    servicioService = TestBed.inject(ServicioService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validar crear servicio', () => {
    const fecha1 = new Date('2020-09-25T09:00:00');
    const fecha2 = new Date('2020-09-25T17:00:00');
    component.profileForm.get('idTecnico').setValue('a');
    component.profileForm.get('idTipoServicio').setValue('bb');
    component.profileForm.get('fechaInicial').setValue(fecha1);
    component.profileForm.get('fechaFinal').setValue(fecha2);

    const servicioSpy = spyOn(servicioService, 'agregarServicio').withArgs(component.servicio).and.returnValue(of(true));
    component.onSubmit();
    console.log(servicioSpy);
    expect(servicioService.agregarServicio).toHaveBeenCalledTimes(1);


  });
});
