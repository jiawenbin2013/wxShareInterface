/*
 * @Author: jwb jiawenbinlove@163.com
 * @Date: 2023-09-07 08:49:06
 * @LastEditors: jwb jiawenbinlove@163.com
 * @LastEditTime: 2023-10-02 07:57:33
 * @FilePath: /wx-share-interface/src/wx-share/wx-share.controller.ts
 * @Description:router enter
 */
import { Controller, Get, Query } from '@nestjs/common';
import { WxShareService } from './wx-share.service';

@Controller('wx-share')
export class WxShareController {
  constructor(private readonly wxShareService: WxShareService) {}

  @Get('getJsSdkConfig')
  getJsSdkConfig(
    @Query('id') id: number,
    @Query('url') url: string,
    @Query('callback') callback: string,
  ) {
    return this.wxShareService.getJsSdkConfig(id, url, callback);
  }
}
