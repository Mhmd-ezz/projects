import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    // @ Any DIRECTIIVE + EXPORT
  ],
  exports: [
    CommonModule,
    // @ Any DIRECTIIVE + EXPORT
  ]
})
export class AppSharedModule {}
