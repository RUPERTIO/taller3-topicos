import { ObjectType, Field, ID } from '@nestjs/graphql';
import { TaskStatus } from './task-status.enum';

/**
 * Entidad que representa una tarea en el sistema de gestión.
 */
@ObjectType({ description: 'Una tarea en el sistema de gestión de proyectos.' })
export class Task {
  /**
   * Identificador único de la tarea.
   */
  @Field(() => ID, { description: 'Identificador único de la tarea' })
  id: string;

  /**
   * Título descriptivo de la tarea.
   */
  @Field({ description: 'Título descriptivo de la tarea' })
  title: string;

  /**
   * Descripción detallada de lo que requiere la tarea.
   */
  @Field({ description: 'Descripción detallada de la tarea' })
  description: string;

  /**
   * Estado actual en el flujo de trabajo (Ej: To Do, In Progress).
   */
  @Field(() => TaskStatus, { description: 'Estado actual de la tarea' })
  status: TaskStatus;

  /**
   * Arreglo dinámico de etiquetas asociadas a la tarea.
   */
  @Field(() => [String], { description: 'Etiquetas o tags para categorizar la tarea' })
  tags: string[];

  /**
   * Fecha en la que la tarea fue creada.
   */
  @Field(() => Date, { description: 'Fecha de creación de la tarea' })
  createdAt: Date;

  /**
   * Nombre o identificador del usuario responsable de realizar la tarea.
   */
  @Field({ description: 'Usuario asignado a la tarea' })
  assignee: string;

  /**
   * Nombre o identificador del proyecto al que pertenece la tarea.
   */
  @Field({ description: 'Proyecto al que pertenece la tarea' })
  project: string;
}
