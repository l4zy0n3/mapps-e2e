export class ChartsPage {
  searchChart(chartName) {
    cy.get('[placeholder="Filter"]').type(`${chartName}{enter}`)
  }

  installChart(chartName) {
    this.searchChart(chartName)
    cy.contains(chartName).click()
    cy.get('[data-testid="btn-chart-install"]').click()
    cy.contains('button', 'Next').click({ multiple: true })
    cy.contains('button', 'Install').click()
  }

  deleteChart(chartName) {
    cy.get('[data-testid="sortable-table_check_select_all"] span').click()
    cy.get('[data-testid="sortable-table-promptRemove"]').click()
    cy.get('[data-testid="prompt-remove-confirm-button"]').click()
    cy.contains('text=Deleting...').should('not.exist')
    cy.contains('text=SUCCESS').should('be.visible')
  }

  downloadChart(chartName) {
    this.searchChart(chartName)
    cy.contains(chartName).click()
    cy.contains('link', 'Download').click()
  }
}
