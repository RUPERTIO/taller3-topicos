import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskInput } from './create-task.input';
import { UpdateTaskInput } from './update-task.input';
import { TaskStatus } from './task-status.enum';
import { randomUUID } from 'crypto';

/**
 * Servicio encargado de gestionar la lógica de negocio de las Tareas.
 * Utiliza un arreglo en memoria para almacenar los datos.
 */
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  /**
   * Obtiene todas las tareas registradas.
   * @returns {Task[]} Arreglo de tareas
   */
  findAll(): Task[] {
    return this.tasks;
  }

  /**
   * Obtiene una tarea específica por su ID.
   * @param {string} id - El identificador único de la tarea
   * @returns {Task} La tarea encontrada
   * @throws {NotFoundException} Si la tarea no existe
   */
  findById(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Tarea con ID "${id}" no encontrada.`);
    }
    return task;
  }

  /**
   * Crea una nueva tarea y la almacena en memoria.
   * @param {CreateTaskInput} input - Datos para la creación de la tarea
   * @returns {Task} La tarea recién creada
   */
  createTask(input: CreateTaskInput): Task {
    const newTask: Task = {
      id: randomUUID(),
      ...input,
      status: TaskStatus.BACKLOG, // Estado por defecto
      createdAt: new Date(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  /**
   * Actualiza una tarea existente.
   * @param {UpdateTaskInput} input - Datos a actualizar, requiere el ID
   * @returns {Task} La tarea actualizada
   */
  updateTask(input: UpdateTaskInput): Task {
    const task = this.findById(input.id);
    
    if (input.title !== undefined) task.title = input.title;
    if (input.description !== undefined) task.description = input.description;
    if (input.status !== undefined) task.status = input.status;
    if (input.tags !== undefined) task.tags = input.tags;
    if (input.assignee !== undefined) task.assignee = input.assignee;
    if (input.project !== undefined) task.project = input.project;

    return task;
  }

  /**
   * Elimina una tarea por su ID.
   * @param {string} id - El identificador único de la tarea a eliminar
   * @returns {boolean} True si se eliminó correctamente
   */
  deleteTask(id: string): boolean {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Tarea con ID "${id}" no encontrada para eliminar.`);
    }
    this.tasks.splice(taskIndex, 1);
    return true;
  }
}
