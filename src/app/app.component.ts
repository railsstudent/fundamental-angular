import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-root',
  imports: [ShoppingCartComponent],
  template: '<app-shopping-cart />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
