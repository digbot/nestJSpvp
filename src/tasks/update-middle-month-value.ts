import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { MonthService } from '../month/service/month.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const monthService = app.get(MonthService);

  console.log('Starting calculation for middleMonthValueByYear...');
  try {
    await monthService.updateMiddleMonthValueByYear();
    console.log('Finished updating middleMonthValueByYear successfully.');
  } catch (err) {
    console.error('Error during execution:', err);
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();
