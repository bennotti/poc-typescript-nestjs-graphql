import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRunning(): string {
    return 'API is Running!!';
  }
}
