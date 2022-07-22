import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TargetGuard } from './target.guard';

const routes: Routes = [
  {
    path: 'popup',
    loadChildren: () =>
      import('./popup/popup.module').then((m) => m.PopupModule),
  },
  {
    path: 'options',
    loadChildren: () =>
      import('./options/options.module').then((m) => m.OptionsModule),
  },
  { path: '**', component: AppComponent, canActivate: [TargetGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
