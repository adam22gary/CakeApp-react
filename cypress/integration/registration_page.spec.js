describe('The Registration Page', function () {
    beforeEach(function () {
      // reset and seed the database prior to every test
    //   cy.exec('npm run db:reset && npm run db:seed')
  
      // seed a user in the DB that we can control from our tests
      // assuming it generates a random password for us
      cy.request('POST', 'http://localhost:3000/register/new', { username: 'janet_smith@gmail.com' })
        .its('body')
        .as('currentUser')
    })
  
    it('sets auth token when logging in via form submission', function () {
      // destructuring assignment of the this.currentUser object
      const { username, password } = this.currentUser
  
      cy.visit('http://localhost:3000/register')
  
      cy.get('input[name=username]').type(username)
  
      // {enter} causes the form to submit
      cy.get('input[name=password]').type(`${password}{enter}`)
  
      // we should be redirected to /dashboard
      cy.url().should('include', '/')
  
      // our auth token should be present
      cy.getCookie('your-session-token').should('exist')
  
      // UI should reflect this user being logged in
      cy.get('h1').should('contain', 'jane.lane')
    })
  })