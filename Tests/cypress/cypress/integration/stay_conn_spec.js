describe('Simple tests for Stay Connected APP', function() {
  it('Check that app is openning', function(){
    cy.visit('/dashboard/sites');
    cy.contains('Sites').should('be.visible')
  });

  it('Check redirection from Sites to particular Location ', function(){
    cy.get('#1002').find('button').click();
    cy.contains('Locations').should('be.visible')
  })
});
