# Backend Lab

A technical laboratory for experimenting with the latest versions of **NestJS** and the modern Node.js/TypeScript backend ecosystem. This is not a production application — it's a sandbox for validating new dependency versions, testing patterns, integrations, and best practices before adopting them in real projects.

---

## What is this?

Backend Lab is a controlled environment to:

- Test and validate new **NestJS** major/minor releases
- Experiment with **TypeORM** versions and configuration patterns
- Explore NestJS features: modules, guards, interceptors, pipes, decorators
- Prototype CRUD patterns with real TypeScript types
- Validate integrations before adopting them in production codebases

The modules in this repo are based on a sample Northwind-style schema (customers, products, orders, etc.) — chosen because they're familiar, relatable, and complex enough to expose real-world TypeORM and NestJS behavior.

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | ≥ 20.x | Runtime |
| TypeScript | ^5.9 | Language |
| NestJS | ^11.x | Framework |
| TypeORM | 0.3.x | ORM |
| Jest | ^30.x | Testing |
| ESLint + Prettier | Latest | Linting & formatting |

---

## Prerequisites

- **Node.js** >= 20.x ([download](https://nodejs.org))
- **npm** >= 9.x (bundled with Node.js)
- A running **database** if you want to connect TypeORM (PostgreSQL recommended). Without a DB the app still starts but routes will fail at the repository level.

---

## Installation

```bash
npm install
```

---

## Running the Project

```bash
# Development with hot-reload
npm run start:dev

# Development (single run)
npm run start

# Production (requires build first)
npm run build
npm run start:prod

# Debug mode
npm run start:debug
```

The server starts on `http://localhost:3000` by default. Set `PORT` env variable to override.

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run start` | Start in development mode |
| `npm run start:dev` | Start with watch/hot-reload |
| `npm run start:debug` | Start in debug mode |
| `npm run start:prod` | Start compiled production build |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:cov` | Run tests with coverage report |
| `npm run lint` | Lint and auto-fix |
| `npm run format` | Format code with Prettier |

---

## Project Structure

```
src/
├── app.module.ts                    # Root module (no DB connected by default)
├── app.controller.ts                # Health-check route (GET /)
├── app.service.ts
├── main.ts                          # App bootstrap
│
├── customers/                       # Example: full CRUD module
│   ├── DTO/
│   │   └── CreateCustomersDTO.ts
│   ├── customers.controller.ts
│   ├── customers.controller.spec.ts
│   ├── customers.entity.ts
│   ├── customers.module.ts
│   └── customers.service.ts
│
├── products/                        # Similar CRUD pattern
├── orders/
├── order_status/
├── order_tax_status/
├── purchase_order_status/
├── employee_privileges/
├── inventory_transactions/
├── inventory_transactions_types/
├── sales_reports/
├── strings/                         # Generic template module (for new experiments)
└── priviliges/                      # Note: typo intentionally preserved (legacy name)
```

Each module follows the standard NestJS structure:
- **Entity** — TypeORM table definition
- **DTO** — Input validation type
- **Service** — Business logic + repository calls
- **Controller** — HTTP routes
- **Module** — Wires everything together
- **Spec** — Unit test skeleton

---

## Connecting a Database

By default, `AppModule` does not configure a database connection — none of the feature modules are imported. To experiment with a real database:

1. Add a database driver: `npm install pg` (for PostgreSQL)
2. Configure `TypeOrmModule.forRoot(...)` in `app.module.ts`:

```typescript
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'your-password',
      database: 'backend_lab',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // only for development/lab use
    }),
    CustomersModule,
    ProductsModule,
    // ... other modules
  ],
})
export class AppModule {}
```

---

## Available API Routes

Once modules are registered, each exposes these endpoints:

| Method | Path | Description |
|--------|------|-------------|
| GET | `/customers` | List all |
| GET | `/customers/name/:name` | Filter by name |
| GET | `/customers/type/:type` | Filter by type |
| DELETE | `/customers/:id` | Delete by ID |

All other modules (`/products`, `/orders`, `/order-status`, `/order-tax-status`, `/purchase-order-status`, `/employee-privileges`, `/inventory-transactions`, `/inventory-transaction-types`, `/sales-reports`, `/strings`, `/privileges`) expose the same route pattern.

---

## How to Use This Repo as a Lab

### Adding a new experiment

1. Generate a module with the NestJS CLI:
   ```bash
   npx @nestjs/cli generate module experiments/my-feature
   npx @nestjs/cli generate controller experiments/my-feature
   npx @nestjs/cli generate service experiments/my-feature
   ```

2. Add your entity and DTO under the new module.

3. Register it in `AppModule` imports.

4. Run `npm run start:dev` and test with curl or Postman.

### Testing a new NestJS version

1. Update `@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express` in `package.json`
2. Run `npm install`
3. Check for breaking changes in the [NestJS changelog](https://github.com/nestjs/nest/releases)
4. Start the app and run tests: `npm run start:dev` and `npm test`

### Best practices for experiments

- Keep experiments in isolated modules — don't mix concerns
- Write at least one spec per controller (skeleton is already provided)
- If an experiment is abandoned, remove it cleanly rather than leaving dead code
- Document the purpose of non-obvious modules with a comment at the top of the module file

---

## Running Tests

```bash
# All unit tests
npm run test

# Watch mode (useful during development)
npm run test:watch

# Coverage report
npm run test:cov
```

Tests use mocked repositories via `getRepositoryToken`, so no real database connection is required to run the test suite.

---

## Project Status

**Active lab** — Updated regularly to track the latest stable NestJS and TypeORM releases.

Current focus:
- NestJS 11.x
- TypeORM 0.3.x
- Node.js 20+ compatibility
- Jest 30.x

---

## Possible Future Improvements

- [ ] Add `.env` support via `@nestjs/config`
- [ ] Add global validation pipe with `class-validator`
- [ ] Add Swagger/OpenAPI documentation (`@nestjs/swagger`)
- [ ] Add Docker Compose with a PostgreSQL container for zero-config DB setup
- [ ] Add e2e test setup
- [ ] Explore NestJS microservices and event-driven patterns
