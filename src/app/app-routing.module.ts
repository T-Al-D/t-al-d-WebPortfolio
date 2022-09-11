import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { IntroComponent } from "./about-me/intro/intro.component";
import { KnowledgeComponent } from "./about-me/knowledge/knowledge.component";
import { ProjectsComponent } from "./load-portfolio/projects/projects.component";

const routes: Routes = [
    { path: "", redirectTo: "about-me/intro", pathMatch: "full" }, // Default URL (What is typically seen first)
    { path: "about-me/intro", component: IntroComponent },
    { path: "about-me/knowlege", component: KnowledgeComponent },
    { path: "load-portfolio/projects", component: ProjectsComponent },
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
];
