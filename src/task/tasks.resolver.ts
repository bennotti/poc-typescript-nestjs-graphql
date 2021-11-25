import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { TaskType } from './dto/create-task.dto';
import { TaskInput } from './input-tasks.input';
import { Task } from './interfaces/task.interface'

@Resolver(of => TaskType)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query(returns  => [TaskType])
  async tasks(): Promise<TaskType[]> {
    return this.tasksService.findAll();
  }

  @Mutation(returns => TaskType)
  async createTask(@Args('input') input: TaskInput): Promise<TaskType> {
    return this.tasksService.create(input);
  }

  @Mutation(returns => TaskType)
  async updateTask(
    @Args('id') id: string,
    @Args('input') input: TaskInput,
  ) {
    return this.tasksService.update(id, input as Task);
  }

  @Mutation(returns  => TaskType)
  async deleteTask(@Args('id') id: string) {
    return this.tasksService.delete(id);
  }

  @Query(returns => String)
  async hello() {
    return 'hello';
  }
}
