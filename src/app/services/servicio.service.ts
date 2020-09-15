import { Servicio } from 'src/app/model/servicio.model';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private url = 'http://localhost:8080/api/v1';
  constructor(private http: HttpClient ) { }

  agregarServicio(servicio: Servicio){
    console.log(servicio)
    return this.http.post(`${this.url}/servicios`, servicio);
  }

  consultarHoras(idTecnico: string, semana: number){
    console.log(`${this.url}/servicios/${idTecnico}/semana/${semana}`);
    return this.http.get(`${this.url}/servicios/${idTecnico}/semana/${semana}`);
  }



}
