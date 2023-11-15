// Lets you make GET HTTP calls to retrieve resources.

it('Get  a resource', () => {
  //Send a GET request to the API
  cy.request('https://jsonplaceholder.typicode.com/posts/1').then(
    (response) => {
      //Verify the response status code
      expect(response.status).to.eq(200);

      //Verify the response status text
      expect(response.statusText).to.eq('OK');

      //Verify the response body
      expect(response.body).to.have.property('id', 1);

      //Verify the response headers
      expect(response.headers).to.have.property(
        'content-type',
        'application/json; charset=utf-8'
      );
    }
  );
});
