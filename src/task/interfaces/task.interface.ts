import { Document } from 'mongoose';

export interface Task extends Document {
    readonly title: string;
    readonly finished: boolean;
    readonly description: string;
}
