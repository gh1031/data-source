// import axios from 'axios';
// import fs from 'fs';
// import cheerio from 'cheerio';
// import path from 'path';
// import Base from './base';

// const TARGET_HOST = 'https://image.so.com/zjl';
// const BTBT_HOST = 'http://www.3btjia.com/forum-index-fid-8-page-3.htm';
// class Spider extends Base {
//   public async home(ctx) {
//     await ctx.render('spider');
//   }
//   public async downloadPic(ctx) {
//     const { query } = ctx;
//     const { data } = await axios.get(`${TARGET_HOST}?ch=${query.type || 'beauty'}&sn=${query.sn}`)
//     try {
//       const { list } = data;
//       for (let i = 0; i < list.length; i++) {
//         const item = list[i];
//         const response = await axios.get(item.imgurl, {
//           responseType: 'stream',
//         });
//         this.download(response.data, item.imgkey)
//       }
//       ctx.body = data.list;
//     } catch {
//       // 
//     }
//   }

//   public async getPageList() {
//     const { data: html } = await axios.get(BTBT_HOST);
//     const $ = cheerio.load(html);
//     const itemList = $('#threadlist').find('a.subject_link');
//     const pageList = [];
//     for (let i = 0; i < itemList.length; i++) {
//       pageList.push(itemList[i].attribs.href);
//     }
//     return pageList;
//   }
//   /**
//    * 
//    * @param links 获取每个单页里的图片链接
//    */
//   public async getPeerPageInfos(link) {
//     const { data: html } = await axios.get(link);
//     const $ = cheerio.load(html);
//     const title = $('table.post_table h2').text().trim();
//     const pictures = $('table.post_table').find('.message img');
//     const srcs = [];
//     for (let i = 0; i < pictures.length; i++) {
//       srcs.push(pictures[i].attribs.src);
//     }
//     return { title, srcs };
//   }
//    /**
//    * 
//    * @param links 获取所有单页里的文件链接
//    */
//   public async getAllPageInfos(links: string[]): Promise<any> {
//     return Promise.all(links.map(link => this.getPeerPageInfos(link)));
//   }

//   public async downloadBTBT(ctx) {
//     const pageList = await this.getPageList();
//     const data = await this.getAllPageInfos(pageList);
//     data.forEach(async ({ title, srcs }) => {
//       srcs.forEach(async src => {
//         const { data } = await axios.get(src, {
//           responseType: 'stream',
//         });
//         await this.download(data, src.split('/').pop(), title);
//       })
//     })
//     ctx.body = { pageList, data };
//   }

//   public async download(stream, filename: string, dirname = 'images') {
//     if (!fs.existsSync(path.resolve(__dirname, `../static/${dirname}`))) {
//       fs.mkdirSync(path.resolve(__dirname, `../static/${dirname}`));
//     }
//     stream.pipe(fs.createWriteStream(path.resolve(__dirname, `../static/${dirname}/${filename}`)))
//   }
// }

// export default new Spider();
