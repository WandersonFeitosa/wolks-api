import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('UP!');
    return 'UP!';
  }

  async healthBob() {
    const response = await this.health();
    return response;
  }

  async health() {
    try {
      const response = await axios.get(`https://bob-os70.onrender.com`);

      return response.data;
    } catch (error) {
      console.log('Error: ', error);
      throw new Error(error.message);
    }
  }
}
