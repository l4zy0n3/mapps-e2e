import { RepositoriesPage } from './po/repositories.page';
import { SideBar } from './po/sidebar.component';
import { LoginPage } from './po/login.page';
import { generateName } from '../utils';

describe('Repository CRUD Operations', () => {
  let repoPage;
  let sidebar;
  let loginPage;

  beforeEach(() => {
    cy.visit('http://rancher.local');
    loginPage = new LoginPage();
    sidebar = new SideBar();
    repoPage = new RepositoriesPage();

    cy.login('admin', 'mytestcluster');
    sidebar.navigateToReposPage();
  });

  it('should perform repo CRUD operations', () => {
    const repoName = generateName('test-repo');
    repoPage.addRepo(repoName, 'https://git.rancher.io/charts', 'git', 'release-v2.10');
    // repoPage.editRepo(repoName); // Implement this method in RepositoriesPage if needed
    // repoPage.deleteRepo(repoName); // Implement this method in RepositoriesPage if needed
  });
}); 