import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matDoDisturb, matRemove } from '@ng-icons/material-icons/baseline';

type Item = { id: number; label: string; purchased: boolean; highPriority: boolean };

@Component({
  selector: 'app-shopping-cart',
  imports: [FormsModule, NgIcon],
  viewProviders: [provideIcons({ matDoDisturb, matRemove })],
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
      @if (reverse_items().length > 0) {
        @let num = num_items_purchased();
        @if (num > 0 && num < items().length) {
          {{ num_items_purchased_label() }}
        } @else if (num === 0) {
          You have not purchased any items yet.
        } @else {
          You have bought everything in the shopping cart.
        }
        <ul>
          @for (item of reverse_items(); track item.id) {
            @let itemClasses =
              {
                priority: item.highPriority,
                strikeout: item.purchased,
              };
            <div class="list-item">
              <li [class]="itemClasses" (click)="togglePurchase(item)">{{ item.id }} - {{ item.label }}</li>
              @if (!item.purchased) {
                <button class="btn btn-cancel" aria-label="Delete an item" (click)="deleteItem(item.id)">
                  <ng-icon name="matRemove"></ng-icon>
                </button>
              }
            </div>
          }
        </ul>
      } @else {
        <p>Nothing to see here. <ng-icon name="matDoDisturb"></ng-icon></p>
      }
    </div>
  `,
  styles: `
    div.list-item {
      display: flex;
    }

    div.list-item > li {
      margin-right: 0.5rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartComponent {
  header = signal('Shopping List App');
  items = signal<Item[]>([]);
  reverse_items = computed(() => [...this.items()].reverse());

  newItem = signal('');
  newItemHighPriority = signal(false);

  isEditing = signal(false);

  num_items_purchased = computed(() => this.items().reduce((acc, item) => acc + (item.purchased ? 1 : 0), 0));

  num_items_purchased_label = computed(() => {
    const unit = this.num_items_purchased() === 1 ? 'item' : 'items';
    return `${this.num_items_purchased()} ${unit} purchased`;
  });

  toggleEditing(value: boolean) {
    this.isEditing.set(value);
    this.newItem.set('');
    this.newItemHighPriority.set(false);
  }

  togglePurchase(item: Item) {
    this.items.update((items) => {
      return items.map((element) => (element.id === item.id ? { ...element, purchased: !element.purchased } : element));
    });
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

  deleteItem(id: number) {
    this.items.update((items) => items.filter((item) => item.id !== id));
  }
}
