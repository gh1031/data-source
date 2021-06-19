import companyModel from '../models/company';

export default {
  async addDepartment(model) {
    await companyModel.addDepartment(model);
  }
}
