import { registerEnumType } from '@nestjs/graphql';

/**
 * Enum que representa el estado actual de una tarea en el sistema.
 */
export enum TaskStatus {
  BACKLOG = 'Backlog',
  TODO = 'To Do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
  description: 'Los diferentes estados por los que puede pasar una tarea.',
});
