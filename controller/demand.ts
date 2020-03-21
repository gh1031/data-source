import Base from './base';

class Demand extends Base {

  constructor() {
    super();
  }

  appendProp(target, source) {
    if (!source) return;
    Object.keys(source).map(key => {
      target[key] = source[key];
    })
  }

  /**
   * 
   * @param {Object} ctx 
   * @description 添加需求
   */
  async add(ctx) {
    const { body } = ctx.request;
    console.log(body)
    // const demand = new DemandModel();
    // this.appendProp(demand, body);
    // console.log(JSON.stringify(demand, null, 2));
    // await demand.save();
    // ctx.body = this.returnData(0);
  }

  /**
   * 
   * @param {Object} ctx 
   * @description 发布需求
   */
  async list(ctx) {
    // const docs = await DemandModel.find();
    // console.log(docs);
    // if (!docs.length) {
    //   ctx.body = this.returnData(0, '暂无需求，请先添加需求吧！')
    // } else {
    //   ctx.body = this.returnData(0, '', {
    //     list: docs,
    //     total: null,
    //     pageNum: 1,
    //     pageSize: 20,
    //   })
    // }
    // DemandModel.find().then(docs => {
    //   console.log(docs);
    // });
  }
}

export default new Demand();
