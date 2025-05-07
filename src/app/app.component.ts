import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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
}
