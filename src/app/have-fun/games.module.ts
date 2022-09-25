import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
    GamesRoutingModule,
    gamesRoutingComponents,
} from "./games-routing.module";

@NgModule({
    declarations: [gamesRoutingComponents],
    imports: [CommonModule, GamesRoutingModule],
})
export class GamesModule {}
