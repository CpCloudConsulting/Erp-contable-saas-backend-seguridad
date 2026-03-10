import { CompanyRepository } from "../infrastructure/persistence/UserRepository";
import { CreateCompany } from "../application/use-cases/users/CreateCompany";
import { pool } from "../infrastructure/db/pool";
import { CompanyList } from "../application/use-cases/users/CompanyList";
import { DesactiveCompany } from "../application/use-cases/users/DesactiveCompany";
import { FindCompany } from "../application/use-cases/users/FindCompany";
import { UpdateCompany } from "../application/use-cases/users/UpdateCompany";



export class Container {

  private companyRepository = new CompanyRepository(pool);

  //Funciones de Empresas
  public createCompany = new CreateCompany(this.companyRepository);
  public listCompanies = new CompanyList(this.companyRepository);
  public findCompany = new FindCompany(this.companyRepository);
  public updateCompanyStatus = new DesactiveCompany(this.companyRepository);
  public updateCompany = new UpdateCompany(this.companyRepository);

}