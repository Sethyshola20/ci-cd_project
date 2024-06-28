describe('Movies API', () => {
    const apiUrl = 'http://localhost:3000/api/movies'; // Adjust the URL as needed
  
    beforeEach(() => {
      // Reset the database or ensure it's in a known state
      // This step depends on how you manage your test database
    });
  
    it('should fetch all movies with GET /api/movies', () => {
      cy.request('GET', apiUrl)
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.status).to.eq('success');
          expect(response.body.data).to.be.an('array');
        });
    });
  
    it('should create a new movie with POST /api/movies', () => {
      const newMovie = {
        title: 'Test Movie',
        description: 'This is a test description'
      };
  
      cy.request('POST', apiUrl, newMovie)
        .then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body.status).to.eq('success');
          expect(response.body.data).to.have.property('title', newMovie.title);
          expect(response.body.data).to.have.property('description', newMovie.description);
        });
    });
  
    it('should return 405 for unsupported methods', () => {
      cy.request({
        method: 'PUT',
        url: apiUrl,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(405);
        expect(response.body).to.have.property('message', 'Method not allowed');
      });
    });
  });
  