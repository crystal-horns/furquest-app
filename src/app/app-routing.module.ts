import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
    {path: '', loadChildren: './pages/login/login.module#LoginPageModule'},
    {path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuardService]},
    {
        path: 'profile',
        children: [
            {
                path: 'edit',
                loadChildren: './pages/profile/profile-edit/profile-edit.module#ProfileEditPageModule'
            },
            {
                path: 'change-password',
                loadChildren: './pages/profile/change-password/change-password.module#ChangePasswordPageModule'
            },
            {
                path: 'edit-contacts',
                loadChildren: './pages/profile/edit-contacts/edit-contacts.module#EditContactsPageModule'
            },
            {
                path: ':id',
                loadChildren: './pages/profile/profile.module#ProfilePageModule'
            }
        ],
        canActivate: [AuthGuardService]
    },
    {path: 'guild/:guildId', loadChildren: './pages/guild/guild.module#GuildPageModule', canActivate: [AuthGuardService]},
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
  { path: 'loading', loadChildren: './pages/loading/loading.module#LoadingPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
