import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskType } from './dto/create-task.dto';
import { Task } from './interfaces/task.interface';
import { TaskInput } from './input-tasks.input';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  async create(createTaskDto: TaskInput): Promise<TaskType> {
    const createdTask = new this.taskModel(createTaskDto);
    return await createdTask.save() as any;
  }

  async findAll(): Promise<TaskType[]> {
    return await this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<TaskType> {
    return await this.taskModel.findOne({ _id: id });
  }

  async delete(id: string): Promise<TaskType> {
    return await this.taskModel.findByIdAndRemove(id);
  }

  async update(id: string, task: Task): Promise<TaskType> {
    return await this.taskModel.findByIdAndUpdate(id, task, { new: true });
  }
}
