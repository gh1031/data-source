import request from 'superagent';
import cheerio from 'cheerio';
import Base from './base';

const HOST = 'https://www.zhipin.com';
const Cookie = 'lastCity=101210100; __c=1586428019; __g=-; __l=l=%2Fwww.zhipin.com%2Fhangzhou%2F&r=https%3A%2F%2Fwww.google.com%2F&friend_source=0&friend_source=0; t=WPexYSTnnhM3Ef5s; wt=WPexYSTnnhM3Ef5s; _bl_uid=LtkFj85XstbrX8357sXFm78x6mOb; __zp_seo_uuid__=7b02fb50-c7bc-4f9b-9263-85aa425baef2; Hm_lvt_194df3105ad7148dcf2b98a91b5e727a=1586435200,1586436086,1586489589,1586939077; __a=6132416.1586428019..1586428019.110.1.110.110; __zp_stoken__=24e7F1jmCVXKPBSIFYnYueT0KufcO3updLVi2IRg8KuW8OsoEAa%2FKwlS5dbjcCg3DogWSqS0Z3p9IkHN9bgF7OGWC0IBEBK6ioQjZ9BjmTeY%2FXRz%2FzgUb%2FFW0Qm4%2FbClwujx; Hm_lpvt_194df3105ad7148dcf2b98a91b5e727a=1586941814'
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36'

class Home extends Base {
  jobLists: string[]
  lnglat: [string, string][]
  constructor() {
    super();
    this.jobLists = [];
    this.lnglat = [];
  }
  public async home(ctx): Promise<void> {
    console.log(1)
    await this.fetchJobList();
    console.log(2)
    console.log(this.jobLists)
    this.fetchLngLat(this.jobLists);
    await ctx.render('amap', { title: '高德地图' })
    console.log(3)
  }
  public fetchJobList(): Promise<void> {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < 2; i++) {
        request.get(`${HOST}/c101210100/?query=web%E5%89%8D%E7%AB%AF&page=${i}`)
        .set('User-Agent', UA)
        .set('Cookie', Cookie)
        .end((err, res) => {
          if (err) return;
          const $ = cheerio.load(res.text);
          const jobList = $('.job-list ul li');
          const l = jobList.length;
          if (l === 0) {
            reject('maybe cookie is expired');
          }
          for (let j = 0; j < l; j++) {
            const href = $('.primary-box', jobList[j]).attr('href')
            this.jobLists.push(`${HOST}${href}`)
          }
          console.log(4)
          resolve()
        })
      }
    }) 
  }
  public fetchLngLat(pages: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      for (let i = 0, l = pages.length; i < l; i++) {
        setTimeout(() => {
          request.get(pages[i])
          .set('User-Agent', UA)
          .set('Cookie', Cookie)
          .end((err, res) => {
            const $ = cheerio.load(res.text);
            const lnglat = $('.job-location-map img').attr('src')
            console.log(lnglat)
          })
        }, i * 1000)
      }
    })
  }
}

export default new Home();
