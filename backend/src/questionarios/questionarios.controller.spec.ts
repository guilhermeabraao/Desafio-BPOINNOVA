import { Test, TestingModule } from '@nestjs/testing';
import { QuestionariosController } from './questionarios.controller';
import { QuestionariosService } from './questionarios.service';

describe('QuestionariosController', () => {
  let controller: QuestionariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionariosController],
      providers: [QuestionariosService],
    }).compile();

    controller = module.get<QuestionariosController>(QuestionariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
