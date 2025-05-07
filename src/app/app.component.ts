import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  header = signal("Shopping List App");
  items = signal([
    {
      id: 1,
      label: "10 Apples"
    },
    {
      id: 2,
      label: "20 Bananas"
    },
    {
      id: 3,
      label: "5 Oranges"
    }
  ]);

  newItem = signal('');
  newItemHighPriority = signal(false);

  saveItem() {
    const id = this.items().length + 1;
    this.items.update((items) => [...items, { id, label: this.newItem() }]);
  }
}
