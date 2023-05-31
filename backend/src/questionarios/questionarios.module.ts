import { Module } from '@nestjs/common';
import { QuestionariosService } from './questionarios.service';
import { QuestionariosController } from './questionarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questionarios } from './entities/questionarios.entity';
import { Perguntas } from './entities/perguntas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Questionarios, Perguntas])],
  controllers: [QuestionariosController],
  providers: [QuestionariosService]
})
export class QuestionariosModule { }
