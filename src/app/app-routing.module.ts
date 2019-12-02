import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthRouteGuardService } from './services/auth-route-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthRouteGuardService],
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
      },
      { path: 'compras', loadChildren: './compras/compras.module#ComprasPageModule' }
    ]
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'cadastrar-cliente', loadChildren: './cadastrar-cliente/cadastrar-cliente.module#CadastrarClientePageModule',
  canActivate: [AuthRouteGuardService]},
  { path: 'cadastrar-responsavel', loadChildren: './cadastrar-responsavel/cadastrar-responsavel.module#CadastrarResponsavelPageModule',
  canActivate: [AuthRouteGuardService] },
  { path: 'clinicas', loadChildren: './clinicas/clinicas.module#ClinicasPageModule', canActivate: [AuthRouteGuardService] },
  { path: 'clientes', loadChildren: './clientes/clientes.module#ClientesPageModule' },
  { path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule' },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
