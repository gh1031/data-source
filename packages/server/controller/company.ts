import Base from './base';
import companyService from '../services/conpany';

class CompanyController extends Base {
  async addDepartment(ctx) {
    const { body } = ctx;
    await companyService.addDepartment(body);
  }
}

export default new CompanyController();
