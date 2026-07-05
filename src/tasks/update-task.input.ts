import { InputType, Field, ID } from '@nestjs/graphql';
import { TaskStatus } from './task-status.enum';

@InputType()
export class UpdateTaskInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => TaskStatus, { nullable: true })
  status?: TaskStatus;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field({ nullable: true })
  assignee?: string;

  @Field({ nullable: true })
  project?: string;
}