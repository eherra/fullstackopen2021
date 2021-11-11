describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'testUserHeppu',
      username: 'heppuheppu',
      password: 'hepuli'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('heppuheppu')
      cy.get('#password').type('hepuli')
      cy.get('#login-button').click()

      cy.contains('testUserHeppu logged in')
    })

    it('fails with wrong username or password', function() {
      cy.get('#username').type('heppuheppu')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'heppuheppu', password: 'hepuli' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Testing Cypress abc')
      cy.get('#author').type('Martin Fowler')
      cy.get('#url').type('www.test.com')
      cy.get('#create-blog-button').click()
      cy.contains('a new blog Testing Cypress abc by Martin Fowler added')
      cy.contains('Testing Cypress abc Martin Fowler')
    })

    it('the blog can be liked', function () {
      cy.createBlog({
        title: 'Testing Cypress abc',
        author: 'Martin Fowler',
        url: 'www.test.com'
      })

      cy.contains('view').click()
      cy.contains('likes 0').parent().find('#like-button').click()
      cy.contains('likes 1')
    })

    it('the blog can be removed', function () {
      cy.createBlog({
        title: 'Testing Cypress abc',
        author: 'Martin Fowler',
        url: 'www.test.com'
      })

      cy.contains('view').click()
      cy.get('#remove-button').click()
      cy.contains('the blog was deleted succesfully')
      cy.get('Testing Cypress abc').should('not.exist')
    })

    it('the blogs are ordered by likes', function () {
      cy.createBlog({
        title: 'FirstTitle',
        author: 'FirstAuthor',
        url: 'www.firsturl.com'
      })

      cy.contains('FirstTitle FirstAuthor').parent().find('#view-button').click()
      cy.contains('www.firsturl.com').parent().find('#like-button').as('firstLikeButton')
      cy.get('@firstLikeButton').click()

      cy.createBlog({
        title: 'SecondTitle',
        author: 'SecondAuthor',
        url: 'www.secondurl.com'
      })

      cy.contains('SecondTitle SecondAuthor').parent().find('#view-button').click()
      cy.contains('www.secondurl.com').parent().find('#like-button').as('secondLikeButton')
      cy.get('@secondLikeButton').click()

      cy.createBlog({
        title: 'ThirdTitle',
        author: 'ThirdAuthor',
        url: 'www.thirdurl.com'
      })

      cy.contains('ThirdTitle ThirdAuthor').parent().find('#view-button').click()
      cy.contains('www.thirdurl.com').parent().find('#like-button').as('thirdLikeButton')
      cy.get('@thirdLikeButton').click()
      cy.wait(1000)
      cy.contains('SecondTitle SecondAuthor').parent().find('#view-button').click()
      cy.contains('www.secondurl.com').parent().find('#like-button').as('secondLikeButton')
      cy.get('@secondLikeButton').click()
      cy.wait(1000) // that the like has time to be executed before checking the order

      // checking that the on first place there's a blog which was given most likes
      cy.get('.blogs').first().as('firstBlog')
      cy.log('@firstBlog')
      cy.get('@firstBlog').contains('SecondTitle SecondAuthor')

      cy.get('.blogs').last().as('lastBlog')
      cy.log('@lastBlog')
      cy.get('@lastBlog').contains('ThirdTitle ThirdAuthor')
    })
  })
})