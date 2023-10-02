/*
 * @Author: jwb jiawenbinlove@163.com
 * @Date: 2023-09-07 08:49:06
 * @LastEditors: jwb jiawenbinlove@163.com
 * @LastEditTime: 2023-10-02 07:58:46
 * @FilePath: /wx-share-interface/src/wx-share/wx-share.module.ts
 * @Description: wx share module
 */
import { Module } from '@nestjs/common';
import { WxShareService } from './wx-share.service';
import { WxShareController } from './wx-share.controller';

@Module({
  controllers: [WxShareController],
  providers: [WxShareService],
})
export class WxShareModule {}
