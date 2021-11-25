import { Module } from '@nestjs/common';
import { TasksResolver } from './tasks.resolver';
import { TaskSchema } from './task.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])],
    providers: [TasksResolver, TasksService],
})
export class TasksModule {}
