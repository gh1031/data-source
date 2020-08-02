import request from 'superagent';
import cheerio from 'cheerio';
import Base from './base';

const BOSS_HOST = 'https://www.zhipin.com';
const Cookie = '__zp__pub__=; lastCity=101210100; __c=1588772526; __g=-; __l=l=%2Fwww.zhipin.com%2Fhangzhou%2F&r=https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3DZ2w0QokIRHUZWSUlW3KQCN8jrGOVy0vepxCi0MOCPw-zfGXsbznEcbdTVGc-8kuE%26ck%3D5388.3.176.301.146.354.242.367%26shh%3Dwww.baidu.com%26sht%3Dbaidu%26wd%3D%26eqid%3De88c00f9000a6879000000045eb2bea8&friend_source=0&friend_source=0; _bl_uid=CbkCb9bCvC9e85cpm69aukFkFyqp; __zp_seo_uuid__=f13f0a9f-7edf-42fd-a48f-bb955767e1e8; Hm_lvt_194df3105ad7148dcf2b98a91b5e727a=1595423089; __a=76359217.1595423086..1588772526.25.1.25.25; __zp_stoken__=56b9afBFkAxJ6MVJEQyYFNhhdCHMjL300BSFUUmJ%2FbnoDYXx7e3JpFG1jaFATSSZ%2BLX8SZHB0al4zCiI3BCc9H1s1Hz0hKSQBKGgIQShxd2hjGCEdeRw5cREYUwp6XEk1b0ZXG3UAZzwtOiw%3D; Hm_lpvt_194df3105ad7148dcf2b98a91b5e727a=1595427306'
const CHROME_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
const FIREFOX_UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:79.0) Gecko/20100101 Firefox/79.0";
const BOSS = `${BOSS_HOST}/c101210100/?query=web%E5%89%8D%E7%AB%AF&page=11`;
class Home extends Base {
  jobLists: string[]
  lnglat: [string, string][]

  constructor() {
    super();
    this.jobLists = [];
    this.lnglat = [];
  }

  public async home(ctx): Promise<void> {
    // await this.getJobLists();
    // for (let i = 0; i <= this.jobLists.length; i++) {
    //   await this.getLngLat(this.jobLists[i], i);
    // }
    await ctx.render('amap', { title: '高德地图', jobs: this.jobLists })
  }

  public getJobLists(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < 2; i++) {
        request
          .get(BOSS)
          .set('user-agent', FIREFOX_UA)
          .set('cookie', Cookie)
          .set('accept-encoding', 'gzip, deflate, br')
          .set('accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9')
          .set('dnt', '1')
          .set('referer', 'https://www.zhipin.com/hangzhou/')
          .set('sec-fetch-dest', 'document')
          .set('sec-fetch-mode', 'navigate')
          .set('sec-fetch-site', 'same-origin')
          .set('sec-fetch-user', '?1')
          .set('upgrade-insecure-requests', '1')
          .set('accept-language', 'zh-CN,zh;q=0.9,en;q=0.8')
          .end((err, res) => {
            if (err) reject(`maybe cookie is expired ${err}`, );
            const $ = cheerio.load(res.text);
            const jobList = $('.job-list ul li');
            const length = jobList.length;
            for (let i = 0; i < length; i++) {
              const href = $('.primary-box', jobList[i]).attr('href')
              console.log(href, 'href')
              this.jobLists.push(`${BOSS_HOST}${href}`)
            }
            resolve(this.jobLists);
          })
      }
    }) 
  }
  
  public getLngLat(url: string, i: number): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log(`第${i}次访问`);
      setTimeout(() => {
        request
          .get(`${BOSS_HOST}/job_detail/a39ae802bdfc33cc0HB_2d66E1A~.html`)
          .set('user-agent', FIREFOX_UA)
          .set('cookie', Cookie)
          .set('accept-encoding', 'gzip, deflate, br')
          .set('accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9')
          .set('dnt', '1')
          .set('referer', 'https://www.zhipin.com/hangzhou/')
          .set('sec-fetch-dest', 'document')
          .set('sec-fetch-mode', 'navigate')
          .set('sec-fetch-site', 'same-origin')
          .set('sec-fetch-user', '?1')
          .set('upgrade-insecure-requests', '1')
          .set('accept-language', 'zh-CN,zh;q=0.9,en;q=0.8')
          .end((err, res) => {
            if (err) reject(err);
            const $ = cheerio.load(res.text);
            console.log(res.text, 'html')
            const src = $('.job-location-map img').attr('src')
            console.log(src)
            resolve(src);
          })
      }, 20 * 1000)
    })
  }
}

export default new Home();
