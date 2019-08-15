import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "./services/auth-guard.service";

const routes: Routes = [
    {path: '', redirectTo: 'loading', pathMatch: 'full'},
    {path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
    {path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuardService]},
    {path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule', canActivate: [AuthGuardService]},
    {path: 'guild', loadChildren: './pages/guild/guild.module#GuildPageModule', canActivate: [AuthGuardService]},
    {
        path: 'events',
        children: [
            {
                path: '',
                loadChildren: './pages/events/events.module#EventsPageModule'
            },
            {
                path: ':eventId',
                children: [
                    {
                        path: '',
                        loadChildren: './pages/events/event/event.module#EventPageModule'
                    },
                    {
                        path: ':stepId',
                        loadChildren: './pages/events/event/step/step.module#StepPageModule'
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
