import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';
import { LibroCardComponent } from '../../components/libro-card/libro-card';
import { LibroFormComponent } from '../../components/libro-form/libro-form';
import { LibroService, Libro } from '../../services/libro';
import { AuthService } from '../../services/auth';
@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, LibroCardComponent, LibroFormComponent],
  templateUrl: './libros.html',
  styleUrl: './libros.css'
})
export class LibrosComponent implements OnInit {
  libroService = inject(LibroService);
  authService = inject(AuthService);
  
  libros: Libro[] = [];
  showForm = false;
  editingLibro?: Libro;
  loading = true;

  ngOnInit() {
    this.loadLibros();
  }

  loadLibros() {
    this.libroService.getLibros().subscribe(libros => {
      this.libros = libros;
      this.loading = false;
    });
  }

  onAddNew() {
    this.editingLibro = undefined;
    this.showForm = true;
  }

  onEdit(libro: Libro) {
    this.editingLibro = libro;
    this.showForm = true;
  }

  async onSubmit(libro: Libro) {
    if (this.editingLibro?.id) {
      await this.libroService.updateLibro(this.editingLibro.id, libro);
    } else {
      await this.libroService.addLibro(libro);
    }
    this.showForm = false;
    this.editingLibro = undefined;
  }

  async onDelete(id: string) {
    await this.libroService.deleteLibro(id);
  }

  onCancel() {
    this.showForm = false;
    this.editingLibro = undefined;
  }
}