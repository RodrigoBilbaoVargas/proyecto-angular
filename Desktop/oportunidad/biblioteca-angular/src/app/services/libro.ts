import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Libro {
  id?: string;
  titulo: string;
  autor: string;
  genero: string;
  anio: number;
  descripcion: string;
  imagenUrl: string;
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private firestore = inject(Firestore);
  private librosCollection = collection(this.firestore, 'libros');

  getLibros(): Observable<Libro[]> {
    const q = query(this.librosCollection, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Libro[]>;
  }

  async addLibro(libro: Libro) {
    try {
      libro.createdAt = new Date();
      const docRef = await addDoc(this.librosCollection, libro);
      return { success: true, id: docRef.id };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async updateLibro(id: string, libro: Partial<Libro>) {
    try {
      const libroDoc = doc(this.firestore, `libros/${id}`);
      await updateDoc(libroDoc, libro);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async deleteLibro(id: string) {
    try {
      const libroDoc = doc(this.firestore, `libros/${id}`);
      await deleteDoc(libroDoc);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}