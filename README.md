# Países App

Aplicación para buscar países

La API solo acepta busqueda de paises con el nombre completo o parte del nombre en ingles

## Vista Online

<!-- REVIEW - PENDIENTE -->

**PENDIENTE ⌚**

## Temas de ese proyecto

- Rutas

- RouterLink y RouterLinkActive

- Componentes especializados

- Inputs

- SwitchMaps

- Consumo de APIs

- Tipado de datos

- Menú de aplicación

- ngClass y diferentes formas de manipular clases

- CSS condicionales

- Optimizaciones a peticiones HTTP (Service)

- Debounce manual mediante RxJs

- Persistencia de Datos el localstorage

- Persistencia de data en peticioens

- Ideas de Store

- Re-utilización de componentes

## Levantar proyecto en local

Paso 1 Instala el cli de forma local si no tienes la versión de **CLI** del proyecto

    npm install -D @angular/cli

Paso 2 Levanta la app en local con

    npm run start

Opción 2 crea y ejecuta el comando script

    "scripts": {
      "ng:serve": "ng serve",
    }

Opción 3 crea y ejecuta un script apuntado a node_modules

    "scripts": {
      "ng:serve": "./node_modules/.bin/ng serve",
    }

## Contenido

Se aplicaron los conceptos como: `Módulos`, `Servicios`, `Interfaces`

Directivas: `ngFor`, `ngIf`, `ngIf else`,

Concepto de flujo de datos: `two data binding`

Decoradores: `@Input`, `@Output`, `@viewChild`

Eventos: `(onclick)`, `(ngSubmit)`, `(input)`...

## Enlaces

- [Api Country](https://restcountries.com/)
- [Animate css](https://animate.style/)

## Notas

- **@input** recibe datos del padre, lo envia con corchetes `[nameProp]`

      @Input() placeholder: string = "";

- **@output** envia datos al padre

      @Output() onValue: EventEmitter<string> = new EventEmitter();
      (onValue)="nameEventFatherReceptor($event)"

- **Propiedades dinamicas** Una propiedad con `corchetes` permite que las comillas reciban variables o funciones del **.ts**

- **tap()** Son similares a los middlewere ejecutan porcesos con la data de una patición

      tap((resp) => console.log(resp))
      tap(console.log)

- **switchMap** Cambia un Observable por otro Oservable. CountryPageComponent.ts

      switchMap((param) => this.paisService.verPaisPorId(param.id)),
      switchMap(({ id }) => this.paisService.verPaisPorId(id)),

## Vista previa

![Vista Previa Listado](./src/assets/vista-previa.png)

![Vista Previa individual](./src/assets/country-individual.png)
