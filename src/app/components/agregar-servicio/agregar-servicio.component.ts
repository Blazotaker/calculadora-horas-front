import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';
import { Servicio } from 'src/app/model/servicio.model';
import { ServicioService } from './../../services/servicio.service';

@Component({
  selector: 'app-agregar-servicio',
  templateUrl: './agregar-servicio.component.html',
  styleUrls: ['./agregar-servicio.component.css']
})
export class AgregarServicioComponent implements OnInit {

  servicio: Servicio = new Servicio();
  completado: boolean;
  fechaI: Date;
  validationForm: boolean;
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private servicioService: ServicioService) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.onChangeForm();
  }

  inicializarFormulario(): void{
    this.profileForm = this.fb.group({
      idTecnico: ['', [Validators.required]],
      idTipoServicio: ['', [Validators.required]],
      fechaInicial: ['', Validators.required],
      fechaFinal: ['', [Validators.required, this.validarFechas()]]
    });
  }


  validarFechas(): ValidatorFn{
    return (control: AbstractControl): {[key: string]: boolean} | null => {
      const fechaInicial = this.fechaI;
      if(fechaInicial >= control.value){
        return { 'validacionFecha' : true }
      }
      return null;
    };
  }
  onChangeForm(): void{
    this.profileForm.get('fechaInicial').valueChanges.subscribe(val => {
      this.fechaI = val;
    });
  }

  onSubmit() {
    console.log(this.fechaInicial.value <  this.fechaFinal.value)
    if (this.profileForm.valid) {
      this.servicio.idTecnico = this.idTecnico.value;
      this.servicio.idTipoServicio = this.idTipoServicio.value;
      this.servicio.fechaInicio = this.fechaInicial.value;
      this.servicio.fechaFin = this.fechaFinal.value;
      this.servicioService.agregarServicio(this.servicio)
      .subscribe(data => {
        console.log(data);
        this.completado = true;
      }, error => console.log(error))

    }
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
