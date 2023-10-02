/*
 * @Author: jwb jiawenbinlove@163.com
 * @Date: 2023-09-07 08:49:06
 * @LastEditors: jwb jiawenbinlove@163.com
 * @LastEditTime: 2023-10-02 08:02:23
 * @FilePath: /wx-share-interface/src/wx-share/wx-share.service.ts
 */
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as request from 'request';

@Injectable()
export class WxShareService {
  //配置参数
  private appId = '******'; // 替换为你的微信公众号AppID
  private appSecret = '*********'; // 替换为你的微信公众号AppSecret
  private tokenUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential`;
  private readonly ticketUrl = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi`;
  private accessToken = '';
  private accessTokenExpirationTime = 0;
  private jsApiTicket = '';
  private jsApiTicketExpirationTime = 0;

  /**
   * 获取token
   * @returns
   */
  async getAccessToken(): Promise<string> {
    const currentTime = Math.floor(Date.now() / 1000);
    if (this.accessToken && currentTime < this.accessTokenExpirationTime) {
      return this.accessToken;
    } else {
      return new Promise((resolve, reject) => {
        const newTokenUrl =
          this.tokenUrl + `&appid=${this.appId}&secret=${this.appSecret}`;
        request.get(newTokenUrl, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            const data = JSON.parse(body);
            this.accessToken = data.access_token;
            this.accessTokenExpirationTime = currentTime + data.expires_in;
            resolve(this.accessToken);
          } else {
            reject(error || new Error('Failed to fetch access_token'));
          }
        });
      });
    }
  }

  /**
   * 获取船票ticket
   * @param token
   * @returns
   */
  async getJsApiTicket(token: string): Promise<string> {
    const currentTime = Math.floor(Date.now() / 1000);
    if (this.jsApiTicket && currentTime < this.jsApiTicketExpirationTime) {
      return this.jsApiTicket;
    } else {
      const ticketUrl = `${this.ticketUrl}&access_token=${token}`;
      return new Promise((resolve, reject) => {
        request.get(ticketUrl, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            const data = JSON.parse(body);
            if (data.errcode === 0) {
              this.jsApiTicket = data.ticket;
              this.jsApiTicketExpirationTime = currentTime + data.expires_in;
              resolve(this.jsApiTicket);
            } else {
              reject(new Error('Failed to fetch jsapi_ticket'));
            }
          } else {
            reject(error || new Error('Failed to fetch jsapi_ticket'));
          }
        });
      });
    }
  }

  /**
   * 生成签名算法
   * @param ticket
   * @param nonceStr
   * @param timestamp
   * @param url
   * @returns
   */
  private createSignature(
    ticket: string,
    nonceStr: string,
    timestamp: number,
    url: string,
  ): string {
    const rawString = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;
    const sha1 = crypto.createHash('sha1');
    sha1.update(rawString);
    return sha1.digest('hex');
  }

  /**
   * 返回微信分享需要的内容，兼容前端jsonp处理方式
   * @param id
   * @param url
   * @param callback
   * @returns
   */
  async getJsSdkConfig(id: number, url: string, callback: any): Promise<any> {
    const token = await this.getAccessToken();
    const jsApiTicket = await this.getJsApiTicket(token);
    const nonceStr = Math.random().toString(36).substr(2, 15);
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = this.createSignature(
      jsApiTicket,
      nonceStr,
      timestamp,
      url,
    );
    if (callback) {
      const json = {
        appId: this.appId,
        timestamp,
        nonceStr,
        signature,
      };
      return callback + '(' + JSON.stringify(json) + ')';
    } else {
      return {
        appId: this.appId,
        timestamp,
        nonceStr,
        signature,
      };
    }
  }
}
