import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matDoDisturb } from '@ng-icons/material-icons/baseline';

type Item = { id: number; label: string; purchased: boolean; highPriority: boolean };

@Component({
  selector: 'app-root',
  imports: [FormsModule, NgIcon],
  viewProviders: [ provideIcons({ matDoDisturb })],
  template: `
    <div class="header">
      <h1>{{ header() }}</h1>
      @if (isEditing()) {
        <button class="btn" (click)="toggleEditing(false)">Cancel</button>
      } @else {
        <button class="btn btn-primary" (click)="toggleEditing(true)">Add Item</button>
      }
    </div>

    @if (isEditing()) {
      <form class="add-item-form" (ngSubmit)="saveItem()">
        <input type="text" placeholder="Add new item" name="newItem" [(ngModel)]="newItem" />
        <label>
          <input type="checkbox" [(ngModel)]="newItemHighPriority" name="newItemHighPriority" />
          <span [style.fontWeight]="newItemHighPriority() ? 'bold' : 'normal'"> High Priority</span>
        </label>
        <button type="submit" class="btn btn-primary" [disabled]="newItem().length < 5">Save Item</button>
      </form>
    }
    <div>
      @if (items().length > 0) {
        <ul>
          @for (item of items(); track item.id) {
            @let itemClasses =
              {
                priority: item.highPriority,
                strikeout: item.purchased,
              };
            <li [class]="itemClasses" (click)="togglePurchase(item)">{{ item.id }} - {{ item.label }}</li>
          }
        </ul>
      } @else {
        <p>Nothing to see here. <ng-icon name="matDoDisturb"></ng-icon></p>
      }
    </div>
  `,
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  header = signal('Shopping List App');
  items = signal<Item[]>([]);

  newItem = signal('');
  newItemHighPriority = signal(false);

  isEditing = signal(false);

  toggleEditing(value: boolean) {
    this.isEditing.set(value);
    this.newItem.set('');
    this.newItemHighPriority.set(false);
  }

  togglePurchase(item: Item) {
    item.purchased = !item.purchased;
    this.newItem.set('');
    this.newItemHighPriority.set(false);
  }

  saveItem() {
    if (!this.newItem()) {
      return;
    }
    const id = this.items().length + 1;
    this.items.update((items) => [
      ...items,
      { id, label: this.newItem(), purchased: false, highPriority: this.newItemHighPriority() },
    ]);
    this.newItem.set('');
    this.newItemHighPriority.set(false);
  }
}
