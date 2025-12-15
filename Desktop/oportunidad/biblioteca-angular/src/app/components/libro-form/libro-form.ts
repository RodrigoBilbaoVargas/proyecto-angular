import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Libro } from '../../services/libro';

@Component({
  selector: 'app-libro-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './libro-form.html',
  styleUrl: './libro-form.css'
})
export class LibroFormComponent implements OnInit {
  @Input() libro?: Libro;
  @Output() submit = new EventEmitter<Libro>();
  @Output() cancel = new EventEmitter<void>();

  libroForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.libroForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2)]],
      autor: ['', [Validators.required, Validators.minLength(2)]],
      genero: ['', Validators.required],
      anio: ['', [Validators.required, Validators.min(1000), Validators.max(new Date().getFullYear())]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      imagenUrl: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  ngOnInit() {
    if (this.libro) {
      this.libroForm.patchValue(this.libro);
    }
  }

  onSubmit() {
    if (this.libroForm.valid) {
      this.submit.emit(this.libroForm.value);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}