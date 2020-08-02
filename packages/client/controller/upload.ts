import Base from './base';


class UploadControll extends Base {
  async save(ctx) {
    console.log(ctx);
  }
}

export default new UploadControll();
