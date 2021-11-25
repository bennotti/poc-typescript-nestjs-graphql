import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class TaskInput {
  @Field()
  readonly title: string;
  @Field(() => Int)
  readonly finished: boolean;
  @Field()
  readonly description: string;
}
