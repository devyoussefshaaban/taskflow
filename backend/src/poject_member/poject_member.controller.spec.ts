import { Test, TestingModule } from '@nestjs/testing';
import { PojectMemberController } from './poject_member.controller';
import { PojectMemberService } from './poject_member.service';

describe('PojectMemberController', () => {
  let controller: PojectMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PojectMemberController],
      providers: [PojectMemberService],
    }).compile();

    controller = module.get<PojectMemberController>(PojectMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
