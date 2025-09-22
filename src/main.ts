import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // กรองข้อมูลที่ไม่อยู่ใน DTO ออก
    forbidNonWhitelisted: true, // ส่ง error ถ้ามีข้อมูลที่ไม่ได้ประกาศใน DTO
    transform: true, // แปลงข้อมูลให้เป็นตาม type ที่กำหนด
  }));

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
