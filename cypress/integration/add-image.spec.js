describe("Choose an image", () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully adds a file', () => {
    cy.fixture('dirty-surfer.jpeg', 'base64').then(fileContent => {
      cy.get('.dropzone').upload(fileContent, 'dirty-surfer.jpeg', 'image/jpeg');
      cy.get(".uploader--preview").invoke("prop", "src").should("match", /blob/)
    });
  });
});
