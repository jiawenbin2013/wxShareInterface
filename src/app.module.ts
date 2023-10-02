import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WxShareModule } from './wx-share/wx-share.module';

@Module({
  imports: [WxShareModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
