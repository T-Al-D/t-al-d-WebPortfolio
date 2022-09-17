import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { IntroComponent } from "./about-me/intro/intro.component";
import { KnowledgeComponent } from "./about-me/knowledge/knowledge.component";
import { ProjectsComponent } from "./load-portfolio/projects/projects.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { MoveIoComponent } from "./have-fun/move-io/move-io.component";

const routes: Routes = [
    { path: "", redirectTo: "about-me/intro", pathMatch: "full" }, // default URL (What is typically seen first)
    { path: "about-me/intro", component: IntroComponent },
    { path: "about-me/knowlege", component: KnowledgeComponent },
    { path: "load-portfolio/projects", component: ProjectsComponent },
    { path: "have-fun/move-io", component: MoveIoComponent },
    { path: "**", component: NotFoundComponent }, //Wildcard, if site is not found
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
    IntroComponent,
    KnowledgeComponent,
    ProjectsComponent,
    NotFoundComponent,
];
