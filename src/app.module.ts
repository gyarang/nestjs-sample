import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

function getEnvFilePath(mode: string): string {
  if (mode === 'production') {
    return '.production.env';
  } else if (mode === 'stage') {
    return '.stage.env';
  } else {
    return '.development.env';
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFilePath(process.env.NODE_ENV),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
