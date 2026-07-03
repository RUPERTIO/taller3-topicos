import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskInput } from './create-task.input';
import { UpdateTaskInput } from './update-task.input';

/**
 * Resolver de GraphQL para el recurso Task.
 * Maneja las peticiones de Queries y Mutations.
 */
@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Consulta para obtener todas las tareas.
   * @returns {Task[]} Arreglo de tareas
   */
  @Query(() => [Task], { name: 'tasks', description: 'Obtiene todas las tareas' })
  getTasks(): Task[] {
    return this.tasksService.findAll();
  }

  /**
   * Consulta para obtener una tarea por su ID.
   * @param {string} id - ID de la tarea
   * @returns {Task} Tarea encontrada
   */
  @Query(() => Task, { name: 'task', description: 'Obtiene una tarea específica por su ID' })
  getTaskById(@Args('id', { type: () => ID }) id: string): Task {
    return this.tasksService.findById(id);
  }

  /**
   * Mutación para crear una nueva tarea.
   * @param {CreateTaskInput} input - Datos de creación
   * @returns {Task} Tarea creada
   */
  @Mutation(() => Task, { description: 'Crea una nueva tarea' })
  createTask(@Args('input') input: CreateTaskInput): Task {
    return this.tasksService.createTask(input);
  }

  /**
   * Mutación para actualizar una tarea existente.
   * @param {UpdateTaskInput} input - Datos de actualización
   * @returns {Task} Tarea actualizada
   */
  @Mutation(() => Task, { description: 'Actualiza una tarea existente' })
  updateTask(@Args('input') input: UpdateTaskInput): Task {
    return this.tasksService.updateTask(input);
  }

  /**
   * Mutación para eliminar una tarea.
   * @param {string} id - ID de la tarea a eliminar
   * @returns {boolean} Confirmación de eliminación
   */
  @Mutation(() => Boolean, { description: 'Elimina una tarea por su ID' })
  deleteTask(@Args('id', { type: () => ID }) id: string): boolean {
    return this.tasksService.deleteTask(id);
  }
}
