describe('Movie List Page', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular',
        query: { page: '2' },
      },
      {
        statusCode: 200,
        body: {
          page: 2,
          results: [
            {
              id: 27205,
              title: 'Inception',
              overview: 'A thief who steals corporate secrets...',
              poster_path: '/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg',
              backdrop_path: '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
            },
          ],
          total_pages: 10,
          total_results: 200,
        },
      }
    ).as('popular2')

    cy.visit('/', {
      onBeforeLoad(win) {
        class MockIO {
          constructor(cb) {
            this._cb = cb
          }
          observe(el) {
            const rect = el.getBoundingClientRect()
            setTimeout(() => {
              this._cb([
                {
                  isIntersecting: true,
                  intersectionRatio: 1,
                  target: el,
                  time: Date.now(),
                  boundingClientRect: rect,
                  intersectionRect: rect,
                  rootBounds: null,
                },
              ])
            }, 0)
          }
          unobserve() {}
          disconnect() {}
          takeRecords() {
            return []
          }
        }
        // @ts-ignore
        win.IntersectionObserver = MockIO
      },
    })
  })

  it('loads more movies and shows the new card', () => {
    cy.contains('h2', 'Popular This Week').should('be.visible')

    cy.scrollTo('bottom')
    cy.wait('@popular2', { timeout: 15000 })

    cy.contains('h3', 'Inception').should('be.visible')
    cy.get('img[alt="Inception"]').should('exist')
  })
})
