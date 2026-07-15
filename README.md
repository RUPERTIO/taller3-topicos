 Taller 3 (ahora parcial) Tópicos Especiales de Programación 202625 Universidad Católica Andrés Bello
 Andres E Martinez H
 Lilian S Morales
 ----------------------------------------
 Componente | Versión 

NestJS | 11.x
@nestjs/graphql | 13.x 
@nestjs/apollo + @apollo/server | 13.x / 5.x 
@as-integrations/express5 | 1.x 
 TypeScript | 5.7 
 Jest + Supertest | 30.x / 7.x 
----------------------------
npm run start:dev

http://localhost:3000/graphql
------------------------------------
 Campo | Tipo GraphQL | Descripción |

`id` | `ID!` | UUID v4 generado por el servidor |
`title` | `String!` | Título de la tarea |
`description` | `String!` | Descripción detallada |
`status` | `TaskStatus!` | Estado actual; siempre inicia en `BACKLOG` |
`tags` | `[String!]!` | Etiquetas de clasificación |
`createdAt` | `DateTime!` | Marca de tiempo de creación |
`assignee` | `String!` | Responsable asignado |
`project` | `String!` | Proyecto al que pertenece |
--------------------------------------------------------
### Queries

**Listar todas las tareas**

```graphql
query {
  tasks {
    id
    title
    status
    assignee
    createdAt
  }
}
```

**Obtener una tarea por ID**

```graphql
query {
  task(id: "b3f1c2a4-...") {
    id
    title
    description
    status
    tags
    project
  }
}
```

### Mutations

**Crear una tarea**

```graphql
mutation {
  createTask(
    input: {
      title: "Diseñar el esquema GraphQL"
      description: "Definir tipos, inputs y enums bajo Code-First."
      tags: ["backend", "graphql"]
      assignee: "Andres"
      project: "taller3"
    }
  ) {
    id
    title
    status
    createdAt
  }
}
```

**Actualizar una tarea (campos parciales)**

Solo se modifican los campos enviados; el resto permanece intacto.

```graphql
mutation {
  updateTask(input: { id: "b3f1c2a4-...", status: IN_PROGRESS, tags: ["backend", "wip"] }) {
    id
    title
    status
    tags
  }
}
```

**Eliminar una tarea**

```graphql
mutation {
  deleteTask(id: "b3f1c2a4-...")
}
```