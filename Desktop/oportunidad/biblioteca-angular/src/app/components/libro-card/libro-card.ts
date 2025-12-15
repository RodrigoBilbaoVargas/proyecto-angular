import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Libro } from '../../services/libro';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-libro-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './libro-card.html',
  styleUrl: './libro-card.css'
})
export class LibroCardComponent {
  @Input() libro!: Libro;
  @Output() edit = new EventEmitter<Libro>();
  @Output() delete = new EventEmitter<string>();
  
  authService = inject(AuthService);

  onEdit() {
    this.edit.emit(this.libro);
  }

  onDelete() {
    if (confirm(`¿Estás seguro de eliminar "${this.libro.titulo}"?`)) {
      this.delete.emit(this.libro.id!);
    }
  }
}