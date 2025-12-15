import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  features = [
    { icon: '📚', title: 'Gestión de Libros', description: 'Agrega, edita y organiza tu colección de libros fácilmente.' },
    { icon: '🔐', title: 'Autenticación Segura', description: 'Sistema de login y registro con Firebase Authentication.' },
    { icon: '☁️', title: 'Almacenamiento en la Nube', description: 'Tus libros guardados de forma segura en Firestore.' },
    { icon: '🌙', title: 'Modo Oscuro', description: 'Cambia entre modo claro y oscuro según tu preferencia.' }
  ];
}