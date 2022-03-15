import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerComponent } from './components/banner/banner.component';
import { FooterComponent } from './components/footer/footer.component';
import { CrudComponent } from './components/crud/crud.component';

import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    BannerComponent,
    FooterComponent,
    CrudComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    BannerComponent,
    FooterComponent,
    CrudComponent
  ]
})
export class SharedModule { }
