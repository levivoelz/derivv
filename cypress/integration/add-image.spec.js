describe("Choose an image", () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully adds a file', () => {
    cy.get('.uploader').attachFile('dirty-surfer.jpeg', { subjectType: 'drag-n-drop' });
    cy.get(".uploader--preview").invoke("prop", "src").should("match", /blob/);
  });
});
