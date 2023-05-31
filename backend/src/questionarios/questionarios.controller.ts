import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put } from '@nestjs/common';
import { QuestionariosService } from './questionarios.service';
import { CreateQuestionarioDto } from './dto/create-questionario.dto';
import { UpdateQuestionarioDto } from './dto/update-questionario.dto';
import { Questionarios } from './entities/questionarios.entity';
import { Request } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('questionarios')
@ApiTags('questionarios')
export class QuestionariosController {
  constructor(private readonly questionariosService: QuestionariosService) { }

  @Post()
  @ApiOperation({ summary: 'Cria um questionário' })
  create(@Body() createQuestionarioDto: CreateQuestionarioDto) {
    return this.questionariosService.create(createQuestionarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna uma lista de questionários' })
  findAll(@Req() request: Request): Promise<{ questionarios: Questionarios[]; totalQuestionarios: number; }> {
    return this.questionariosService.findAll(request);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um questionário' })
  updatePut(@Param('id') id: string, @Body() updateQuestionarioDto: UpdateQuestionarioDto) {
    return this.questionariosService.updatePut(+id, updateQuestionarioDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um questionário' })
  updatePatch(@Param('id') id: string, @Body() updateQuestionarioDto: UpdateQuestionarioDto) {
    return this.questionariosService.updatePatch(+id, updateQuestionarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui um questionário' })
  remove(@Param('id') id: string) {
    return this.questionariosService.remove(+id);
  }
}
