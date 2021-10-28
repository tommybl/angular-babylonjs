import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectorComponent } from './containers/sector/sector.component';
import { SceneComponent } from './components/scene/scene.component';
import { SectorGuard } from './routing/guards/sector.guard';
import { SceneGuard } from './routing/guards/scene.guard';

const routes: Routes = [
    {
        path: 'sectors/:sector/:scene',
        component: SceneComponent,
        canActivate: [ SceneGuard ]
    },
    {
        path: 'sectors/:sector',
        component: SectorComponent,
        canActivate: [ SectorGuard ]
    },
    {
        path: '**',
        redirectTo: 'sectors/education'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            anchorScrolling: 'disabled',
            scrollPositionRestoration: 'disabled',
            onSameUrlNavigation: 'reload',
            initialNavigation: 'enabledBlocking'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
