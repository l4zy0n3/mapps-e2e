export class RepositoriesPage {
  get RepositoriesTable() {
    return cy.get('[data-testid="sortable-table"]')
  }
  get RepositoriesFilter() {
    return cy.get('[data-testid="search-box-filter-row"] > .input-sm')
  }
  get ConfirmDeleteButton() {
    return cy.get('[data-testid="prompt-remove-confirm-button"]')
  }
  get DeleteButton() {
    return cy.get('[data-testid="sortable-table-promptRemove"]')
  }
  searchRepo(repositoryName) {
    this.RepositoriesFilter.type(repositoryName)
  }
  addRepo(repositoryName, repositoryURL, repositoryType, repositoryBranch) {
    cy.get('[data-testid="masthead-create"]').click()
    cy.get('[placeholder="A unique name"]').type(repositoryName)

    if (repositoryType === 'git') {
      cy.contains('Git repository').click()
      cy.get('[data-testid="clusterrepo-git-repo-input"]').type(repositoryURL)
      cy.get('[data-testid="clusterrepo-git-branch-input"]').type(repositoryBranch)
    } else if (repositoryType === 'oci') {
    cy.get(':nth-child(3) > .radio-container').click()
      cy.get('[data-testid="clusterrepo-oci-url-input"]').type(repositoryURL)
      cy.contains('Skip TLS Verifications').click()
      cy.contains('Insecure Plain Http').click()
    } else {
      cy.get('[data-testid="clusterrepo-index-url-input"]').type(repositoryURL)
    }

    cy.get('[data-testid="action-button-async-button"]').click()
    cy.verifyRegexDoesExist(`Active.*${repositoryName}`)
  }
  removeRepo(repositoryName) {
    this.searchRepo(repositoryName)
    cy.get('[data-testid="sortable-table_check_select_all"] span').click()
    this.DeleteButton.click()
    this.ConfirmDeleteButton.click()
    cy.verifyRegexDoesNotExist(`Active.*${repositoryName}`)

  }
} 