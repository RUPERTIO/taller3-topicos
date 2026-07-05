import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskInput } from './create-task.input';
import { UpdateTaskInput } from './update-task.input';

/** Expone el CRUD de tareas vía GraphQL; delega toda la lógica al servicio. */
@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) { }

  /** Lista todas las tareas. */
  @Query(() => [Task], { name: 'tasks' })
  getTasks(): Task[] {
    return this.tasksService.findAll();
  }

  /** Busca una tarea por ID. */
  @Query(() => Task, { name: 'task' })
  getTaskById(@Args('id', { type: () => ID }) id: string): Task {
    return this.tasksService.findById(id);
  }

  /** Crea una tarea nueva. */
  @Mutation(() => Task)
  createTask(@Args('input') input: CreateTaskInput): Task {
    return this.tasksService.createTask(input);
  }

  /** Actualiza una tarea existente (campos parciales). */
  @Mutation(() => Task)
  updateTask(@Args('input') input: UpdateTaskInput): Task {
    return this.tasksService.updateTask(input);
  }

  /** Elimina una tarea por ID. */
  @Mutation(() => Boolean)
  deleteTask(@Args('id', { type: () => ID }) id: string): boolean {
    return this.tasksService.deleteTask(id);
  }
}