import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoogleImageSearchComponent } from './google-image-search';

@NgModule({
  declarations: [
    GoogleImageSearchComponent,
  ],
  imports: [
    IonicPageModule.forChild(GoogleImageSearchComponent),
  ],
  exports: [
    GoogleImageSearchComponent
  ]
})
export class GoogleImageSearchComponentModule {}
