import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "./services/auth-guard.service";

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
    {path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuardService]},
    {path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule', canActivate: [AuthGuardService]},
    {path: 'guild', loadChildren: './pages/guild/guild.module#GuildPageModule', canActivate: [AuthGuardService]},
    {
        path: 'quests',
        children: [
            {
                path: '',
                loadChildren: './pages/quests/quests.module#EventsPageModule'
            },
            {
                path: ':questId',
                children: [
                    {
                        path: '',
                        loadChildren: './pages/quests/quest/quest.module#EventPageModule'
                    },
                    {
                        path: ':stepId',
                        loadChildren: './pages/quests/quest/step/step.module#StepPageModule'
                    }
                ]
            }
        ],
        canActivate: [AuthGuardService]
    },
  { path: 'loading', loadChildren: './pages/loading/loading.module#LoadingPageModule' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
