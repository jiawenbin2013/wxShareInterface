import { Test, TestingModule } from '@nestjs/testing';
import { WxShareService } from './wx-share.service';

describe('WxShareService', () => {
  let service: WxShareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WxShareService],
    }).compile();

    service = module.get<WxShareService>(WxShareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
