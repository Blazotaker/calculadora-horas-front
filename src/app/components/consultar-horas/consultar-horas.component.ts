import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicioService } from './../../services/servicio.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultar-horas',
  templateUrl: './consultar-horas.component.html',
  styleUrls: ['./consultar-horas.component.css']
})
export class ConsultarHorasComponent implements OnInit {
  completado: boolean = false;
  conDatos: boolean = false;
  error: boolean = false;
  profileForm: FormGroup;
  respuesta = null;
  errorMensaje = '';


  constructor(private fb: FormBuilder, private servicioService: ServicioService) { }

  inicializarFormulario(): void{
    this.profileForm = this.fb.group({
      idTecnico: ['', [Validators.required]],
      semana: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  onSubmit(): void{
    if (this.profileForm.valid) {
    this.servicioService.consultarHoras(this.idTecnico.value, this.semana.value)
    .subscribe((data: any) => {
      const {horas, error} = data;
      if(error == null){
        this.respuesta = horas;
        console.log(this.respuesta)
        this.conDatos = true;
      }else{
        this.errorMensaje = error;
        this.error = true;
        setTimeout(() => {
          this.error = false;
          this.errorMensaje = '';
        }, 2000);
      }
    }, error => {
      console.log(error)
    });
  }

  }

  get idTecnico(): any {
    return this.profileForm.get('idTecnico');
  }

  get semana(): any {
    return  this.profileForm.get('semana');
  }

}
