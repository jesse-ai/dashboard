const { default: axios } = require('axios')

describe('test home page', () => {
    beforeEach(() => {
        cy.intercept('post', '/auth', { fixture: 'login.json' }).as('login')
        cy.intercept('post', '/general-info', { fixture: 'generalInfo.json' }).as('generalInfo')
        cy.intercept('post', '/get-config', { fixture: 'getConfig.json' }).as('getConfig')
        cy.intercept('post', '/update-config', { fixture: 'updateConfig.json' }).as('updateConfig')
        cy.intercept('post', 'feedback', { fixture: 'feedback.json' }).as('feedback')

        sessionStorage.auth_key = null
        axios.defaults.headers.common.Authorization = null
        cy.visit('/')
        cy.contains('Welcome Back!')
        cy.get('input').type('test')
        cy.get('button').click()
    })

    it('test nav bar elements', () => {
        // close notification
        cy.get('.notyf__dismiss-btn').click()

        // check left navbar links
        cy.get('#import-candles-page-button').click()
        cy.url().should('include', '/candles/1')

        cy.get('#backtest-page-button').click()
        cy.url().should('include', '/backtest/1')

        cy.get('#live-page-button').click()
        cy.url().should('include', '/live/1')

        // check feedback
        cy.get('#open-feedback-button').click()
        cy.wait(50)
        cy.get('#feedback-description').should('include.text', "I would love to hear your feedback whether it's about a bug, suggestion, something you like, or something you hate about Jesse")
        // submit button is disabled when description is empty
        cy.get('#feedback-submit-button').should('be.disabled')
        cy.get('#description').type('some test description')
        cy.wait(50)
        cy.get('#description').should('have.value', 'some test description')
        cy.get('#feedback-submit-button').should('not.disabled')
        cy.get('#feedback-submit-button').click()
        cy.get('.notyf__message').should('include.text', 'Feedback submitted successfully')
        cy.get('#feedback-description').should('have.value', '')
        cy.get('#feedback-cancel-button').click()
        cy.get('#feedback-description').should('not.exist')

        cy.get('#nav-sun-icon').should('not.exist')
        // check theme Switch
        cy.get('#theme-switch-button').click().should(() => {
            expect(localStorage.getItem('theme')).to.eq('dark')
        })
        cy.get('#theme-switch-button').click().should(() => {
            expect(localStorage.getItem('theme')).to.eq('light')
        })

        // check settings
        cy.get('[data-cy=settings-icon]').click()
        cy.wait(50)
        // check backtests
        cy.get('[data-cy=Backtest-setting]').click()
        cy.get('[data-cy=backtest-setting-tab]').should('exist')
        cy.get('[data-cy=backtest-setting-logs-checkboxes]').should('include.text', 'Trading Candles')
        cy.get('[data-cy=backtest-setting-data-input]').should('exist')
        cy.get('[data-cy=backtest-setting-exchange-binance').should('exist')
        cy.get('[data-cy=backtest-setting-exchange-binance-futures').should('exist')
        cy.get('[data-cy=backtest-setting-exchange-bitfinex').should('exist')

        // check Optimization
        cy.get('[data-cy=Optimization-setting]').click()
        cy.contains('Fitness Function')
        cy.get('[data-cy=optimization-setting-tab').should('exist')
        cy.get('[data-cy=optimization-warmup-candles-input]').should('exist')
    })
})