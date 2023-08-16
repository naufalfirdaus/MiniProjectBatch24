import { Module } from '@nestjs/common';
import { GlobalModule } from './global/global.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardService } from './dashboard/dashboard.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
      entities: ['dist/output/entities/*.js'],
      autoLoadEntities: true,
    }),
    GlobalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
