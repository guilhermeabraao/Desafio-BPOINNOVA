import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from './entities/usuarios.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsuariosService {

  constructor(@InjectRepository(Usuarios) private usuarioRepository: Repository<Usuarios>) { }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const cpfExistente = await this.usuarioRepository.findBy({ cpf: createUsuarioDto.cpf })
    if (cpfExistente.length > 0) {
      return { mensagem: 'CPF já cadastrado!' }
    }
    return await this.usuarioRepository.save(createUsuarioDto);
  }

  async findAll(): Promise<Usuarios[]> {
    return await this.usuarioRepository.find();
  }

  async updatePut(codigo: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.findBy({ codigo });
    if (!updateUsuarioDto.nome || !updateUsuarioDto.senha || !updateUsuarioDto.cpf) {
      return { mensagem: 'Todos os campos são obrigatórios!' }
    }
    if (await this.validarCPF(codigo, updateUsuarioDto.cpf)) {
      return { mensagem: 'CPF cadastrado para outro usuário!' }
    }
    usuario[0].nome = updateUsuarioDto.nome;
    usuario[0].senha = updateUsuarioDto.senha;
    usuario[0].cpf = updateUsuarioDto.cpf;
    return await this.usuarioRepository.save(usuario[0]);
  }


  async updatePatch(codigo: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.findBy({ codigo });

    if (updateUsuarioDto.nome) {
      usuario[0].nome = updateUsuarioDto.nome;
    }
    if (updateUsuarioDto.senha) {
      usuario[0].nome = updateUsuarioDto.senha;
    }
    if (updateUsuarioDto.cpf) {
      if (await this.validarCPF(codigo, updateUsuarioDto.cpf)) {
        return { mensagem: 'CPF cadastrado para outro usuário!' }
      }
      usuario[0].nome = updateUsuarioDto.cpf;
    }
    return await this.usuarioRepository.save(usuario[0]);
  }

  async remove(codigo: number) {
    await this.usuarioRepository.delete({ codigo })
    return { mensagem: 'Usuário excluído!' };
  }

  async validarCPF(codigo: number, cpf: string) {
    const cpfExistente = await this.usuarioRepository.findBy({ cpf })
    if (cpfExistente.length > 0 && cpfExistente[0].codigo !== codigo) {
      return true;
    }
    return false;
  }
}
