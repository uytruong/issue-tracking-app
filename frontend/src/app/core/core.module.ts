import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';

@NgModule({
  imports: [StoreModule.forFeature('auth', authReducer),
  EffectsModule.forFeature([AuthEffects])]
})
export class CoreModule {}
