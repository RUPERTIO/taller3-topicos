import { InputType, Field, ID } from '@nestjs/graphql';
import { TaskStatus } from './task-status.enum';

/**
 * DTO (Data Transfer Object) para la actualización de una tarea existente.
 * Todos los campos son opcionales excepto el ID.
 */
@InputType()
export class UpdateTaskInput {
  /**
   * Identificador único de la tarea a actualizar.
   */
  @Field(() => ID, { description: 'ID de la tarea a actualizar' })
  id: string;

  /**
   * Título descriptivo de la tarea (opcional).
   */
  @Field({ nullable: true, description: 'Título descriptivo de la tarea' })
  title?: string;

  /**
   * Descripción detallada de lo que requiere la tarea (opcional).
   */
  @Field({ nullable: true, description: 'Descripción detallada de la tarea' })
  description?: string;

  /**
   * Estado actual en el flujo de trabajo (opcional).
   */
  @Field(() => TaskStatus, { nullable: true, description: 'Estado actual de la tarea' })
  status?: TaskStatus;

  /**
   * Arreglo dinámico de etiquetas asociadas a la tarea (opcional).
   */
  @Field(() => [String], { nullable: true, description: 'Etiquetas o tags para categorizar la tarea' })
  tags?: string[];

  /**
   * Nombre o identificador del usuario responsable de realizar la tarea (opcional).
   */
  @Field({ nullable: true, description: 'Usuario asignado a la tarea' })
  assignee?: string;

  /**
   * Nombre o identificador del proyecto al que pertenece la tarea (opcional).
   */
  @Field({ nullable: true, description: 'Proyecto al que pertenece la tarea' })
  project?: string;
}
