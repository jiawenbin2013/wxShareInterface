import { Test, TestingModule } from '@nestjs/testing';
import { WxShareController } from './wx-share.controller';
import { WxShareService } from './wx-share.service';

describe('WxShareController', () => {
  let controller: WxShareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WxShareController],
      providers: [WxShareService],
    }).compile();

    controller = module.get<WxShareController>(WxShareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
