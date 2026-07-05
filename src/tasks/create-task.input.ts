import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => [String])
  tags: string[];

  @Field()
  assignee: string;

  @Field()
  project: string;
}