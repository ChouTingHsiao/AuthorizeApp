import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ROOT_REDUCER } from '@shared/Ngrx/Reducer/root.reducer';
import { UserEffects } from '@shared/Ngrx/Effects/user.effects';
import { RoleEffects } from '@shared/Ngrx/Effects/role.effects';
import { GroupEffects } from '@shared/Ngrx/Effects/group.effects';
import { ProgramEffects } from '@shared/Ngrx/Effects/program.effects';
import { MenuEffects } from '@shared/Ngrx/Effects/menu.effects';
import { ButtonEffects } from '@shared/Ngrx/Effects/button.effects';
import { environment } from '../../../environments/environment';

@NgModule({
    imports: [
        EffectsModule.forRoot([
            UserEffects,
            RoleEffects,
            GroupEffects,
            ProgramEffects,
            MenuEffects,
            ButtonEffects,
        ]),
        StoreModule.forRoot(ROOT_REDUCER, {
            runtimeChecks: {
              strictStateImmutability: true,
              strictActionImmutability: true,
              strictStateSerializability: true,
              strictActionSerializability: true,
            }
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
    ]
})

export class NgrxModule { }
