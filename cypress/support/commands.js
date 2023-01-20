// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('Login', (username, password) => {
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password, { log: false });
  cy.get('[data-test="login-button"]').as('btnLogin').click();
});

Cypress.Commands.add('isInViewPort', (element) => {
  cy.get(element).then(($el) => {
    const bottom = Cypress.$(cy.state('window')).height();
    const rect = $el[0].getBoundingClientRect();
    expect(rect.top).to.be.least(0);
    expect(rect.bottom).to.be.greaterThan(0);
    expect(rect.top).to.be.lessThan(bottom);
    expect(rect.bottom).to.be.lessThan(bottom);
  });
});

//Command to create a fixture file data
Cypress.Commands.add('userData', () => {
  const { faker } = require('@faker-js/faker');
  cy.writeFile('cypress/fixtures/testData.json', {
    testData: Cypress._.times(5, () => {
      return {
        name: `${faker.lorem.words(3)}`,
        email: `${faker.internet.email()}`,
      };
    }),
  });
});

Cypress.Commands.add('createUser', (apiRequest) => {
  cy.request({
    url: Cypress.config('apiUrl') + 'users',
    method: 'POST',
    body: apiRequest,
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + Cypress.env('apiToken'),
    },
  });
});

Cypress.Commands.add('updateUser', (apiRequest) => {
  cy.request({
    url: Cypress.config('apiUrl') + 'users' + '/' + apiRequest.id,
    method: 'PUT',
    body: apiRequest,
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + Cypress.env('apiToken'),
    },
  });
});

Cypress.Commands.add('getUser', (userId) => {
  cy.request({
    url: Cypress.config('apiUrl') + 'users' + '/' + userId,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + Cypress.env('apiToken'),
    },
  });
});
