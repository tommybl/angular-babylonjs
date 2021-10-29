import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SceneComponent } from './containers/scene/scene.component';
import { HotspotDrawerComponent } from './components/hotspot-drawer/hotspot-drawer.component';
import { HttpClientModule } from '@angular/common/http';
import { SectorComponent } from './containers/sector/sector.component';
import { RunScriptsDirective } from './directives/run-scripts.directive';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
    declarations: [
        AppComponent,
        SceneComponent,
        HotspotDrawerComponent,
        SectorComponent,
        RunScriptsDirective,
        SafeHtmlPipe,
        HeaderComponent,
        LoaderComponent,
        ClickOutsideDirective
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
