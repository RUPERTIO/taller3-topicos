import { InputType, Field } from '@nestjs/graphql';

/**
 * DTO (Data Transfer Object) para la creación de una nueva tarea.
 */
@InputType()
export class CreateTaskInput {
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
   * Arreglo dinámico de etiquetas asociadas a la tarea.
   */
  @Field(() => [String], { description: 'Etiquetas o tags para categorizar la tarea' })
  tags: string[];

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
