import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskInput } from './create-task.input';
import { UpdateTaskInput } from './update-task.input';
import { TaskStatus } from './task-status.enum';
import { randomUUID } from 'crypto';

/**
 * Maneja el CRUD de tareas. Por ahora vive todo en memoria;
 * si se agrega una BD, este es el único archivo que cambiaría.
 */
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  /** Devuelve todas las tareas registradas. */
  findAll(): Task[] {
    return this.tasks;
  }

  /**
   * Busca una tarea por ID.
   * @throws NotFoundException si no existe.
   */
  findById(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new NotFoundException(`Tarea con ID "${id}" no encontrada.`);
    return task;
  }

  /** Crea una tarea nueva; siempre arranca en estado BACKLOG. */
  createTask(input: CreateTaskInput): Task {
    const newTask: Task = {
      id: randomUUID(),
      ...input,
      status: TaskStatus.BACKLOG,
      createdAt: new Date(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  /**
   * Actualiza solo los campos que vengan definidos en el input.
   * @throws NotFoundException si la tarea no existe.
   */
  updateTask({ id, ...changes }: UpdateTaskInput): Task {
    const task = this.findById(id);
    const definedChanges = Object.fromEntries(
      Object.entries(changes).filter(([, value]) => value !== undefined),
    );
    return Object.assign(task, definedChanges);
  }

  /**
   * Elimina una tarea por ID.
   * @throws NotFoundException si no existe.
   */
  deleteTask(id: string): boolean {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) throw new NotFoundException(`Tarea con ID "${id}" no encontrada para eliminar.`);
    this.tasks.splice(index, 1);
    return true;
  }
}