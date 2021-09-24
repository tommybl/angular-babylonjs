import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectorComponent } from './containers/sector/sector.component';
import { SceneComponent } from './components/scene/scene.component';

const routes: Routes = [
    {
        path: 'sectors/:sector/:scene',
        component: SceneComponent,
    },
    {
        path: 'sectors/:sector',
        component: SectorComponent,
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
            onSameUrlNavigation: 'reload'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
