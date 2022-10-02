import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { StayOnBoardComponent } from "./stay-on-board/stay-on-board.component";

// define child-routes !!!
const routes: Routes = [
    {
        path: "stay-on-board",
        component: StayOnBoardComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GamesRoutingModule {}
export const gamesRoutingComponents = [StayOnBoardComponent];
