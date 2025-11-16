import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface CustomerSource {
  nombre: string;
  pais: string;
  compania: string;
  representante: string;
}

interface Customer {
  name: string;
  country: { name: string };
  company: string;
  representative: { name: string };
}

@Component({
  selector: 'app-reports-admin-page',
  imports: [CommonModule],
  templateUrl: './reports-admin-page.html',
})
export class ReportsAdminPage implements OnInit {
  private customersArray: CustomerSource[] = [
    {
      nombre: 'James Butt',
      pais: 'Algeria',
      compania: 'Benton, John B Jr',
      representante: 'Ioni Bowcher',
    },
    {
      nombre: 'Josephine Darakjy',
      pais: 'Egypt',
      compania: 'Chanay, Jeffrey A Esq',
      representante: 'Amy Elsner',
    },
    {
      nombre: 'Art Venere',
      pais: 'Panama',
      compania: 'Chemel, James L Cpa',
      representante: 'Asiya Javayant',
    },
    {
      nombre: 'Lenna Paprocki',
      pais: 'Slovenia',
      compania: 'Feltz Printing Service',
      representante: 'Xuxue Feng',
    },
    {
      nombre: 'Donette Foller',
      pais: 'South Africa',
      compania: 'Printing Dimensions',
      representante: 'Asiya Javayant',
    },
    {
      nombre: 'Simona Morasca',
      pais: 'Egypt',
      compania: 'Chapman, Ross E Esq',
      representante: 'Ivan Magalhaes',
    },
    {
      nombre: 'Mitsue Tollner',
      pais: 'Paraguay',
      compania: 'Morlong Associates',
      representante: 'Ivan Magalhaes',
    },
    {
      nombre: 'Leota Dilliard',
      pais: 'Serbia',
      compania: 'Commercial Press',
      representante: 'Onyama Limba',
    },
    {
      nombre: 'Sage Wieser',
      pais: 'Egypt',
      compania: 'Truhlar And Truhlar Attys',
      representante: 'Ivan Magalhaes',
    },
    {
      nombre: 'Kris Marrier',
      pais: 'Mexico',
      compania: 'King, Christopher A Esq',
      representante: 'Onyama Limba',
    },
    {
      nombre: 'Minna Amigon',
      pais: 'Romania',
      compania: 'Dorl, James J Esq',
      representante: 'Anna Fali',
    },
    {
      nombre: 'Abel Maclead',
      pais: 'Singapore',
      compania: 'Rangoni Of Florence',
      representante: 'Bernardo Dominic',
    },
    {
      nombre: 'Kiley Caldarera',
      pais: 'Serbia',
      compania: 'Feiner Bros',
      representante: 'Onyama Limba',
    },
    {
      nombre: 'Graciela Ruta',
      pais: 'Chile',
      compania: 'Buckley Miller & Wright',
      representante: 'Amy Elsner',
    },
    {
      nombre: 'Cammy Albares',
      pais: 'Philippines',
      compania: 'Rousseaux, Michael Esq',
      representante: 'Asiya Javayant',
    },
  ];

  // Arreglo final que usará el template
  customers: Customer[] = [];

  ngOnInit(): void {
    // Transformamos los datos al formato esperado por PrimeNG
    this.customers = this.customersArray.map(
      (c): Customer => ({
        name: c.nombre,
        country: { name: c.pais },
        company: c.compania,
        representative: { name: c.representante },
      }),
    );
  }
}
