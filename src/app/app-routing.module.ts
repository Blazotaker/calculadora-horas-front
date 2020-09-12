import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarServicioComponent } from './components/agregar-servicio/agregar-servicio.component';

const routes: Routes = [
  { path: 'agregarservicio', component: AgregarServicioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
