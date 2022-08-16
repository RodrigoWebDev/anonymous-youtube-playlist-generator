describe('App tests', () => {
  const videoName = "Placeholder video"
  const defaultVideoUrl = "https://www.youtube.com/watch?v=u31qwQUeGuM"

  const element = {
    goToPlaylist: '#goToPlaylistButton',
    removeVideo: '#removeVideoIcon',
    videoLink: '[data-testid="videoLink"]'
  }

  
  const addVideo = () => {
    cy.get("#videoUrlField").type(defaultVideoUrl)
    cy.get("#videoNameField").type(videoName)
    cy.get("#submitButton").click()
  }

  const removeTargetAttr = (el) => {
    return cy.get(el).invoke('removeAttr', 'target')
  } 

  beforeEach(() => {
    cy.visit("http://localhost:1234")
  })

  it('should add video to playlist', () => {
    addVideo()
    cy.get(element.videoLink).contains(videoName).should('exist')
    cy.get(element.goToPlaylist).should('exist')
  })

  it('should go to playlist', () => {
    addVideo()
    removeTargetAttr(element.goToPlaylist).click()
    cy.url().should('include', 'https://www.youtube.com/')
  })

  it('should remove a video from playlist', () => {
    addVideo()
    cy.get(element.removeVideo).click()
    cy.get(element.videoLink).should('not.exist')
  })

  it('should remove all videos from playlist', () => {
    addVideo()
    cy.get("#deleteEntirePlaylist").click()
    cy.get(".swal2-confirm").click()
    cy.get(element.videoLink).should('not.exist')
  })

  it('should go to an individual youtube video', () => {
    addVideo()    
    removeTargetAttr(`${element.videoLink} a`).click()
    cy.url().should('include', defaultVideoUrl)
  })

  /* it.only('should import import a playlist JSON file', () => {
    cy.get("#importJSONButton").click()
    cy.get("#inputImportJson").click()
  }) */
})