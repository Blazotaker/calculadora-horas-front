import { HomeComponent } from './components/home/home.component';
import { ConsultarHorasComponent } from './components/consultar-horas/consultar-horas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarServicioComponent } from './components/agregar-servicio/agregar-servicio.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'agregarservicio', component: AgregarServicioComponent },
  { path: 'consultarhora', component: ConsultarHorasComponent},
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
