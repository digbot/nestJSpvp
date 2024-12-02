import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async runPythonScript(): Promise<string> {
    return new Promise((resolve, reject) => {
      const options = {
        cwd: './google_sheet_writer',
        env: { ...process.env, PYTHONIOENCODING: 'utf-8' },
      };
      exec('python main.py', options, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing Python script: ${error.message}`);
          return reject(error);
        }
        if (stderr) {
          console.error(`Python script error: ${stderr}`);
          return reject(stderr);
        }
        try {
          //const result = JSON.parse(stdout); // Parse JSON output from Python
          resolve(stdout);
        } catch (parseError) {
          reject(`Error parsing Python output: ${parseError.message}`);
        }
      });
    });
  }
}
