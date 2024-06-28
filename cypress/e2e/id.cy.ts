describe('Movie API', () => {
    let movieId = "1";
    const apiUrl = 'http://localhost:3000/api/movies'; // Base URL for movies
    const movieUrl = (id:string) => `${apiUrl}/${id}`; // Function to get the URL for a specific movie
  
    before(() => {
      // Create a movie to work with in the tests
      cy.request('POST', apiUrl, {
        title: 'Test Movie',
        description: 'This is a test description'
      }).then((response) => {
        movieId = response.body.data.id; // Save the movie ID for later tests
      });
    });
  
    after(() => {
      // Clean up the created movie
      cy.request('DELETE', movieUrl(movieId));
    });
  
    it('should fetch a specific movie with GET /api/movies/:id', () => {
      cy.request('GET', movieUrl(movieId))
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.status).to.eq('success');
          expect(response.body.data).to.have.property('id', movieId);
        });
    });
  
    it('should update a specific movie with PUT /api/movies/:id', () => {
      const updatedMovie = {
        title: 'Updated Test Movie',
        description: 'This is an updated test description'
      };
  
      cy.request('PUT', movieUrl(movieId), updatedMovie)
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.status).to.eq('success');
          expect(response.body.data).to.have.property('title', updatedMovie.title);
          expect(response.body.data).to.have.property('description', updatedMovie.description);
        });
    });
  
    it('should delete a specific movie with DELETE /api/movies/:id', () => {
      cy.request('DELETE', movieUrl(movieId))
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.status).to.eq('success');
  
          // Verify the movie no longer exists
          cy.request({
            method: 'GET',
            url: movieUrl(movieId),
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.eq(404); // Assuming your API returns 404 for not found
          });
        });
    });
  
    it('should return 405 for unsupported methods', () => {
      cy.request({
        method: 'POST',
        url: movieUrl(movieId),
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(405);
        expect(response.body).to.have.property('message', 'Method not allowed');
      });
    });
  });
  