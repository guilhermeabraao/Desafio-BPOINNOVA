import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuarios } from './entities/usuarios.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('usuarios')
@ApiTags('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Post()
  @ApiOperation({ summary: 'Cria um usuário' })
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna uma lista de usuários' })
  findAll(): Promise<Usuarios[]> {
    return this.usuariosService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um usuário' })
  updatePut(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.updatePut(+id, updateUsuarioDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um usuário' })
  updatePatch(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.updatePatch(+id, updateUsuarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui um usuário' })
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
