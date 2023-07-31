import { Module } from '@nestjs/common';
import { GlobalModule } from './global/global.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'alam',
      database: 'revampdb',
      entities: ['dist/output/entitites/*.js'],
      autoLoadEntities: true,
    }),
    GlobalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
