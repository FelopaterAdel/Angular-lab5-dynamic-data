import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink,Router } from '@angular/router';

@Component({
  selector: 'app-product-header',
  imports: [RouterLink,FormsModule],
  templateUrl: './product-header.component.html',
  styleUrl: './product-header.component.css'
})
export class ProductHeaderComponent {
constructor(private router: Router) {}
  category!: string;
  size!: string;

  filterBy() {
    this.router.navigate(['/products'], {
      queryParams: { size: this.size, category: this.category },
    });
  }
}
