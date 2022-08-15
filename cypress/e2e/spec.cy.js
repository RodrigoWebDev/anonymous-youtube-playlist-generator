describe('App tests', () => {

  beforeEach(() => {
    cy.visit("http://localhost:1234")
  })

  it('should add video to playlist', () => {
    const videoName = "Placeholder video"
    cy.get("#videoUrlField").type("https://www.youtube.com/watch?v=u31qwQUeGuM")
    cy.get("#videoNameField").type(videoName)
    cy.get("#submitButton").click()

    cy.get('[data-testid="videoLink"]').contains(videoName)
  })
})