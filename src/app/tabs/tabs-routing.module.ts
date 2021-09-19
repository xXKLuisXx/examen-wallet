import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtectAccessGuardGuard } from '../guards/protect-access-guard.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule),
        //canActivate: [ProtectAccessGuardGuard],
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule),
        //canActivate: [ProtectAccessGuardGuard],
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule),
        //canActivate: [ProtectAccessGuardGuard],
      },
      {
        path: 'home',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ],
    canActivate: [ProtectAccessGuardGuard],
  },
  {
    path: 'home',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
