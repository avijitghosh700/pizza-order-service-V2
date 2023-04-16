import { environment } from 'src/environments/environment';

// Testing the REST API call by sending request to server.
describe('Testing pizza get API', () => {
  it('Getting pizzas from API', () => {
    // Visiting the root route of the application and then calling HTTP request to get pizzas.
    cy.visit('/').then(() => {
      cy.request({
        method: 'GET',
        url: `${environment.api}/pizza.json`,
      }).then((response) => {
        expect(response.status).to.be.equal(200);

        expect(response.body)
          .to.have.property('pizza')
          .to.have.length.greaterThan(0);
      });
    });
  });
});

// Intercepting a HTTP request by mocking the API call on the client side, where response body is provided from the fixtures folder.
describe('Intercepting the API request', () => {
  it('Intercepting', () => {
    // Explicit syntax
    // cy.intercept(
    //   {
    //     method: 'GET',
    //     url: `${environment.api}/pizza.json`,
    //   },
    //   { fixture: 'pizza.json' }
    // ).as('pizza'); // --> @pizza

    // Short syntax
    cy.intercept('GET', `${environment.api}/pizza.json`, {
      fixture: 'pizza.json',
    }).as('pizza'); // --> @pizza

    cy.visit('/');

    cy.wait('@pizza').then(({ response }) => {
      expect(response?.statusCode).to.be.equal(200);

      expect(response?.body)
        .to.have.property('pizza')
        .to.have.length.greaterThan(0);
    });
  });
});
