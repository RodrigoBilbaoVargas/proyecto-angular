import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  darkMode = signal<boolean>(false);

  constructor() {
    // Cargar preferencia guardada
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      this.darkMode.set(savedTheme === 'true');
    }

    // Aplicar tema al cargar
    effect(() => {
      const isDark = this.darkMode();
      if (isDark) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      localStorage.setItem('darkMode', isDark.toString());
    });
  }

  toggleTheme() {
    this.darkMode.update(value => !value);
  }
}