import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';
import { Servicio } from 'src/app/model/servicio.model';
import { ServicioService } from './../../services/servicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-servicio',
  templateUrl: './agregar-servicio.component.html',
  styleUrls: ['./agregar-servicio.component.css']
})
export class AgregarServicioComponent implements OnInit {

  servicio: Servicio = new Servicio();
  completado: boolean = false;
  fechaI: Date;
  validationForm: boolean;
  profileForm: FormGroup;
  error: boolean = false;
  errorMensaje: '';


  constructor(private fb: FormBuilder, private servicioService: ServicioService, private router: Router) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.onChangeForm();
  }

  inicializarFormulario(): void {
    this.profileForm = this.fb.group({
      idTecnico: ['', [Validators.required]],
      idTipoServicio: ['', [Validators.required]],
      fechaInicial: ['', Validators.required],
      fechaFinal: ['', [Validators.required, this.validarFechas()]]
    });
  }


  validarFechas(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const fechaInicial = this.fechaI;
      if (fechaInicial >= control.value) {
        return { 'validacionFecha': true }
      }
      return null;
    };
  }
  onChangeForm(): void {
    this.profileForm.get('fechaInicial').valueChanges.subscribe(val => {
      this.fechaI = val;
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.servicio.idTecnico = this.idTecnico.value;
      this.servicio.idTipoServicio = this.idTipoServicio.value;
      this.servicio.fechaInicio = this.fechaInicial.value;
      this.servicio.fechaFin = this.fechaFinal.value;
      this.servicioService.agregarServicio(this.servicio)
        .subscribe((data: any) => {
          const { servicio, error } = data;
          if (error == null) {
            this.completado = true;
            setTimeout(() => {
              this.irAInicio();
            }, 2500);
          } else {
            this.error = true;
            this.errorMensaje = error;
            setTimeout(() => {
              this.completado = false;
              this.errorMensaje = '';
              this.error = false;
            }, 3000);
          }

        }, error => {
          console.log(error);
        })
    } else {

    }
  }

  irAInicio() {
    this.router.navigate(['']);
  }

  get idTecnico(): any {
    return this.profileForm.get('idTecnico');
  }

  get idTipoServicio(): any {
    return this.profileForm.get('idTipoServicio');
  }

  get fechaInicial(): any {
    return this.profileForm.get('fechaInicial');
  }

  get fechaFinal(): any {
    return this.profileForm.get('fechaFinal');
  }

}
