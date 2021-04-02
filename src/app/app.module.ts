import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SceneComponent } from './babylon/scene/scene.component';
import { DrawersComponent } from './components/drawers/drawers.component';
import { DrawerHotspot1Component } from './components/drawer-hotspot1/drawer-hotspot1.component';
import { DrawerHotspot2Component } from './components/drawer-hotspot2/drawer-hotspot2.component';
import { DrawerHotspot3Component } from './components/drawer-hotspot3/drawer-hotspot3.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [
        AppComponent,
        SceneComponent,
        DrawersComponent,
        DrawerHotspot1Component,
        DrawerHotspot2Component,
        DrawerHotspot3Component
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatTooltipModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
