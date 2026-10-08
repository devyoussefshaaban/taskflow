import { Test, TestingModule } from '@nestjs/testing';
import { PojectMemberService } from './poject_member.service';

describe('PojectMemberService', () => {
  let service: PojectMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PojectMemberService],
    }).compile();

    service = module.get<PojectMemberService>(PojectMemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
