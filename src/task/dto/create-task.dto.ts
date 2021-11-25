import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
@ObjectType()
export class TaskType {
  @Field(() => ID)
  @IsString()
  readonly id?: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @Field(() => Int)
  @IsBoolean()
  readonly finished: boolean;
  @Field()
  @IsString()
  readonly description: string;
}
