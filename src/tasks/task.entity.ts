import { ObjectType, Field, ID } from '@nestjs/graphql';
import { TaskStatus } from './task-status.enum';

@ObjectType({ description: 'Una tarea en el sistema de gestión de proyectos.' })
export class Task {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => TaskStatus)
  status: TaskStatus;

  @Field(() => [String])
  tags: string[];

  @Field(() => Date)
  createdAt: Date;

  @Field()
  assignee: string;

  @Field()
  project: string;
}