import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { SideNavComponent } from "./side-nav/side-nav.component";
import { MainRouterComponent } from "./main-router/main-router.component";
//import { GamesComponent } from "./have-fun/games/games.component";

import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatRippleModule } from "@angular/material/core";

@NgModule({
    declarations: [
        routingComponents,
        AppComponent,
        HeaderComponent,
        FooterComponent,
        SideNavComponent,
        MainRouterComponent,
        //GamesComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatRippleModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
