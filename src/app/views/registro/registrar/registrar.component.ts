import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent {
  form!: FormGroup
  tipoEntidad!: string;
  etiquetasDisponibles: string[] = ['temp', 'thermal', 'time'];

  constructor(private formBuilder: FormBuilder) {

  }

  registrarEntidad(event:Event) {
    if (this.form.valid) {
      console.log(this.form.value)
    } else {
      // Manejar la validación del formulario
      console.log('No es valido')
    }
    console.log(this.tipoEntidad)
    if (this.tipoEntidad == "sitio"){

    }
    else if (this.tipoEntidad == "equipo") {
    }
    else if (this.tipoEntidad == "sensor") {

    }
    event.preventDefault();

  }
  changeEntidad(event:Event){
    this.tipoEntidad=(event.target as HTMLSelectElement).value;
    if (this.tipoEntidad == 'sensor'){
      this.form = this.formBuilder.group({
        sitio: ['', Validators.required],
        equipo: ['', Validators.required],
        identificador: ['', Validators.required],
        descripcion: ['', [Validators.required]],
        unidad: ['', Validators.required],
        etiqueta: ['', Validators.required],

      });
    }
    else if (this.tipoEntidad =='equipo'){
      this.form = this.formBuilder.group({
        sitio: ['', Validators.required],
        identificador: ['', [Validators.required]],
        equipo: ['', Validators.required],
      });
    }
    else if (this.tipoEntidad =='sitio'){
      this.form = this.formBuilder.group({
        identificador: ['', Validators.required],
        area: ['', [Validators.required]],
      });
    }
  }

}
