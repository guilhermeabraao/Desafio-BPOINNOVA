import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Usuarios } from './usuarios/entities/usuarios.entity';
import { Tabelas1685554810615 } from './migrations/1685554810615-tabelas';
import { QuestionariosModule } from './questionarios/questionarios.module';
import { Questionarios } from './questionarios/entities/questionarios.entity';
import { Perguntas } from './questionarios/entities/perguntas.entity';

const port = process.env.DB_PORT as unknown as number | undefined

@Module({
  imports: [UsuariosModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: port,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Usuarios, Questionarios, Perguntas],
      migrations: [Tabelas1685554810615]
    }),
    QuestionariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
