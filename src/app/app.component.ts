import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { matDoDisturb } from '@ng-icons/material-icons/baseline';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-root',
  imports: [ShoppingCartComponent],
  viewProviders: [ provideIcons({ matDoDisturb })],
  template: `
    <app-shopping-cart />
  `,
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
