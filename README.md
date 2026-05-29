# Backend Lab

Un laboratorio técnico para experimentar con las últimas versiones de **NestJS** y el ecosistema moderno de backend en Node.js/TypeScript. No es una aplicación de producción — es un sandbox para validar versiones de dependencias, probar patrones, integraciones y buenas prácticas antes de adoptarlos en proyectos reales.

---

## ¿Qué es esto?

Backend Lab es un entorno controlado para:

- Probar y validar nuevas versiones mayor/menor de **NestJS**
- Experimentar con versiones y patrones de configuración de **TypeORM**
- Explorar funcionalidades de NestJS: módulos, guards, interceptors, pipes, decoradores
- Prototipar patrones CRUD con tipos TypeScript reales
- Validar integraciones antes de adoptarlas en proyectos de producción

Los módulos de este repo están basados en un esquema de ejemplo estilo Northwind (clientes, productos, órdenes, etc.) — elegido porque es familiar, fácil de entender y suficientemente complejo para exponer comportamientos reales de TypeORM y NestJS.

---

## Stack tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Node.js | ≥ 20.x | Runtime |
| TypeScript | ^5.9 | Lenguaje |
| NestJS | ^11.x | Framework |
| TypeORM | 0.3.x | ORM |
| Jest | ^30.x | Testing |
| ESLint + Prettier | Latest | Linting y formato |

---

## Prerrequisitos

- **Node.js** >= 20.x ([descargar](https://nodejs.org))
- **npm** >= 9.x (incluido con Node.js)
- Una **base de datos** activa si querés conectar TypeORM (se recomienda PostgreSQL). Sin DB el servidor arranca igual pero las rutas fallarán a nivel de repositorio.

---

## Instalación

```bash
npm install
```

---

## Levantar el proyecto

```bash
# Desarrollo con hot-reload
npm run start:dev

# Desarrollo (ejecución única)
npm run start

# Producción (requiere build previo)
npm run build
npm run start:prod

# Modo debug
npm run start:debug
```

El servidor arranca en `http://localhost:3000` por defecto. Usar la variable de entorno `PORT` para cambiarlo.

---

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run start` | Inicia en modo desarrollo |
| `npm run start:dev` | Inicia con watch/hot-reload |
| `npm run start:debug` | Inicia en modo debug |
| `npm run start:prod` | Inicia el build compilado de producción |
| `npm run build` | Compila TypeScript a `dist/` |
| `npm run test` | Ejecuta tests unitarios |
| `npm run test:watch` | Ejecuta tests en modo watch |
| `npm run test:cov` | Ejecuta tests con reporte de cobertura |
| `npm run lint` | Lintea y auto-corrige |
| `npm run format` | Formatea el código con Prettier |

---

## Estructura del proyecto

```
src/
├── app.module.ts                    # Módulo raíz (sin DB conectada por defecto)
├── app.controller.ts                # Ruta de health-check (GET /)
├── app.service.ts
├── main.ts                          # Bootstrap de la app
│
├── customers/                       # Ejemplo: módulo CRUD completo
│   ├── DTO/
│   │   └── CreateCustomersDTO.ts
│   ├── customers.controller.ts
│   ├── customers.controller.spec.ts
│   ├── customers.entity.ts
│   ├── customers.module.ts
│   └── customers.service.ts
│
├── products/                        # Mismo patrón CRUD
├── orders/
├── order_status/
├── order_tax_status/
├── purchase_order_status/
├── employee_privileges/
├── inventory_transactions/
├── inventory_transactions_types/
├── sales_reports/
├── strings/                         # Módulo de plantilla genérica (para nuevos experimentos)
└── priviliges/                      # Nota: typo preservado intencionalmente (nombre legado)
```

Cada módulo sigue la estructura estándar de NestJS:
- **Entity** — Definición de tabla TypeORM
- **DTO** — Tipo de validación de entrada
- **Service** — Lógica de negocio + llamadas al repositorio
- **Controller** — Rutas HTTP
- **Module** — Conecta todo
- **Spec** — Esqueleto de test unitario

---

## Conectar una base de datos

Por defecto, `AppModule` no configura una conexión a base de datos — ninguno de los módulos de features está importado. Para experimentar con una DB real:

1. Agregar un driver de base de datos: `npm install pg` (para PostgreSQL)
2. Configurar `TypeOrmModule.forRoot(...)` en `app.module.ts`:

```typescript
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'tu-password',
      database: 'backend_lab',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // solo para desarrollo/lab
    }),
    CustomersModule,
    ProductsModule,
    // ... otros módulos
  ],
})
export class AppModule {}
```

---

## Rutas API disponibles

Una vez registrados los módulos, cada uno expone estos endpoints:

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/customers` | Listar todos |
| GET | `/customers/name/:name` | Filtrar por nombre |
| GET | `/customers/type/:type` | Filtrar por tipo |
| DELETE | `/customers/:id` | Eliminar por ID |

Todos los demás módulos (`/products`, `/orders`, `/order-status`, `/order-tax-status`, `/purchase-order-status`, `/employee-privileges`, `/inventory-transactions`, `/inventory-transaction-types`, `/sales-reports`, `/strings`, `/privileges`) exponen el mismo patrón de rutas.

---

## Cómo usar este repo como laboratorio

### Agregar un nuevo experimento

1. Generar un módulo con el CLI de NestJS:
   ```bash
   npx @nestjs/cli generate module experiments/mi-feature
   npx @nestjs/cli generate controller experiments/mi-feature
   npx @nestjs/cli generate service experiments/mi-feature
   ```

2. Agregar la entidad y el DTO dentro del nuevo módulo.

3. Registrarlo en los imports de `AppModule`.

4. Correr `npm run start:dev` y probar con curl o Postman.

### Probar una nueva versión de NestJS

1. Actualizar `@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express` en `package.json`
2. Ejecutar `npm install`
3. Revisar los breaking changes en el [changelog de NestJS](https://github.com/nestjs/nest/releases)
4. Levantar la app y correr los tests: `npm run start:dev` y `npm test`

### Buenas prácticas para experimentos

- Mantener los experimentos en módulos aislados — no mezclar responsabilidades
- Escribir al menos un spec por controller (ya hay un esqueleto incluido)
- Si un experimento se abandona, eliminarlo limpiamente en lugar de dejar código muerto
- Documentar el propósito de módulos no obvios con un comentario al inicio del archivo del módulo

---

## Ejecutar tests

```bash
# Todos los tests unitarios
npm run test

# Modo watch (útil durante el desarrollo)
npm run test:watch

# Reporte de cobertura
npm run test:cov
```

Los tests usan repositorios mockeados via `getRepositoryToken`, por lo que no se requiere conexión real a la base de datos para correr la suite.

---

## Estado del proyecto

**Lab activo** — Actualizado regularmente para seguir las últimas versiones estables de NestJS y TypeORM.

Foco actual:
- NestJS 11.x
- TypeORM 0.3.x
- Compatibilidad con Node.js 20+
- Jest 30.x

---

## Posibles mejoras futuras

- [ ] Agregar soporte para `.env` via `@nestjs/config`
- [ ] Agregar global validation pipe con `class-validator`
- [ ] Agregar documentación Swagger/OpenAPI (`@nestjs/swagger`)
- [ ] Agregar Docker Compose con un contenedor PostgreSQL para setup de DB sin configuración
- [ ] Agregar setup de tests e2e
- [ ] Explorar microservicios de NestJS y patrones event-driven
