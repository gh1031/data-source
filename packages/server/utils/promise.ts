import cheerio from 'cheerio';
import request from 'superagent';

const HOST = 'https://www.zhipin.com';
const Cookie = 'lastCity=101210100; __c=1586428019; __g=-; __l=l=%2Fwww.zhipin.com%2Fhangzhou%2F&r=https%3A%2F%2Fwww.google.com%2F&friend_source=0&friend_source=0; t=WPexYSTnnhM3Ef5s; wt=WPexYSTnnhM3Ef5s; _bl_uid=LtkFj85XstbrX8357sXFm78x6mOb; __zp_seo_uuid__=9188ae56-d372-4397-8734-4635bbe553dc; Hm_lvt_194df3105ad7148dcf2b98a91b5e727a=1586428027,1586435200,1586436086,1586489589; __a=6132416.1586428019..1586428019.86.1.86.86; Hm_lpvt_194df3105ad7148dcf2b98a91b5e727a=1586512385; __zp_stoken__=f19alHVyW%2F59E%2BxQWh1lXPG7hUMsS%2Fo4IWOpqorBuRQb3vwaRmWoSW1CE4sN%2BWFgHymDCmZjopY48HHIblcu579wnjIR3DaY0B2DnG9TGEwUFmKp%2FOVtfhOLM73O%2F8QkUF%2FI'
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36'
// 'https://www.zhipin.com/c101210100/?query=web%E5%89%8D%E7%AB%AF&page=1'

export default function getLngLat(): Promise<unknown> {
  // return new Promise((resolve, reject) => {
    // const position = []
  return Promise.all(Array.from(Array(1)).map((_el, i) => {
    return new Promise((resolve) => {
      request.get(`${HOST}/c101210100/?query=web%E5%89%8D%E7%AB%AF&page=${i}`)
        .set('User-Agent', UA)
        .set('Cookie', Cookie)
        .end((_err, res) => {
          const $ = cheerio.load(res.text);
          const jobList = $('.job-list ul li')
          for (let i = 0; i < 5; i++) {
            const href = $('.primary-box', jobList[i]).attr('href')
            console.log(href, 'href');
            if (href) {
              console.log(`${HOST}${href}`, 'host');
              request.get(`${HOST}${href}`)
                .set('User-Agent', UA)
                .set('Cookie', Cookie)
                .end((_err, res) => {
                  const $ = cheerio.load(res.text);
                  const src = $('.job-location-map img').attr('src')
                  console.log(src, 'job-position')
                  if (src) {
                    const pos = src.match(/A:(.*)&key/)[1].split(',')
                    resolve(pos)
                  } else {
                    resolve(null)
                  }
                })
              }
            }
        })
    })
  }))
    // for (let i = 0; i < 10; i++) {
    //   try {
    //   } catch(e) {
    //     reject(e)
    //   } finally {
    //     resolve(position)
    //     console.log(position, 'pos')
    //   }
    // }
    
  // })
}
