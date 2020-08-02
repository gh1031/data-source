import Base from './base';

class Spider extends Base {
  public async home(ctx) {
    await ctx.render('spider')
  }
}

export default new Spider();
