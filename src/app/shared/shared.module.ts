import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LogoComponent } from './components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUpdateProductComponent } from './components/add-update-product/add-update-product.component';



@NgModule({
  declarations: [HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    AddUpdateProductComponent
    
  ],
  exports:[HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    ReactiveFormsModule,
    AddUpdateProductComponent
  ],
  imports: [
    CommonModule,
    //vamos a utilizar componentes de ionic
    IonicModule,
    //utilizaremos formulario de ionic
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
