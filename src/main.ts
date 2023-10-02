/*
 * @Author: jwb jiawenbinlove@163.com
 * @Date: 2023-09-07 08:43:57
 * @LastEditors: jwb jiawenbinlove@163.com
 * @LastEditTime: 2023-09-07 15:05:47
 * @FilePath: /wx-share-interface/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  await app.listen(9111);
}
bootstrap();
