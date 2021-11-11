const { default: axios } = require('axios')

describe('test home page', () => {
    beforeEach(() => {
        // mock important requests
        cy.intercept('post', '/auth', { fixture: 'login.json' }).as('login')
        cy.intercept('post', '/general-info', { fixture: 'generalInfo.json' }).as('generalInfo')
        cy.intercept('post', '/get-config', { fixture: 'getConfig.json' }).as('getConfig')
        cy.intercept('post', '/update-config', { fixture: 'updateConfig.json' }).as('updateConfig')
        cy.intercept('post', 'feedback', { fixture: 'feedback.json' }).as('feedback')
        cy.intercept('post', 'make-strategy', { fixture: 'makeStrategy.json' }).as('makeStrategy')

        // remove cookies and storage 
        sessionStorage.auth_key = null
        axios.defaults.headers.common.Authorization = null
        // visit first page and type password
        cy.visit('/')
        cy.contains('Welcome Back!')
        cy.get('input').type('test')
        cy.get('button').click()
    })

    it('test nav bar elements', () => {
        // close notification login notification
        cy.get('.notyf__dismiss-btn').click()

        // check left navbar links
        // click on each link and check page url
        cy.get('#import-candles-page-button').click()
        cy.url().should('include', '/candles/1')

        cy.get('#backtest-page-button').click()
        cy.url().should('include', '/backtest/1')

        cy.get('#live-page-button').click()
        cy.url().should('include', '/live/1')
        cy.wait(500)

        // check feedback
        cy.get('#open-feedback-button').click()
        cy.wait(50)
        // must display feedback modal
        cy.get('#feedback-description').should('include.text', "I would love to hear your feedback whether it's about a bug, suggestion, something you like, or something you hate about Jesse")
        // submit button is disabled when description is empty
        cy.get('#feedback-submit-button').should('be.disabled')
        // type some description
        cy.get('#description').type('some test description')
        cy.wait(50)
        cy.get('#description').should('have.value', 'some test description')
        // by typing description submit button is activated
        cy.get('#feedback-submit-button').should('not.disabled')
        cy.get('#feedback-submit-button').click()
        // check feedback notification
        cy.get('.notyf__message').should('include.text', 'Feedback submitted successfully')
        // after feedback description input will be reset
        cy.get('#feedback-description').should('have.value', '')
        cy.get('#feedback-description').should('not.exist')

        // close notification
        cy.get('.notyf__dismiss-btn').click()

        // check theme Switch. by clicking theme switch icon, icon will be change
        cy.get('#nav-sun-icon').should('not.exist')
        cy.get('#theme-switch-button').click().should(() => {
            expect(localStorage.getItem('theme')).to.eq('dark')
        })
        cy.get('#theme-switch-button').click().should(() => {
            expect(localStorage.getItem('theme')).to.eq('light')
        })

        // check settings
        cy.get('[data-cy=settings-icon]').click()
        cy.wait(50)
        // check backtests tab
        cy.get('[data-cy=Backtest-setting]').click()
        // check another tab not opened
        cy.get('[data-cy="optimization-setting-tab"]').should('not.exist')
        cy.get('[data-cy="live-setting-tab"]').should('not.exist')
        cy.get('[data-cy=backtest-setting-tab]').should('exist')
        // check backtest tab data
        cy.get('[data-cy=backtest-setting-logs-checkboxes]').should('include.text', 'Trading Candles')
        cy.get('[data-cy=backtest-setting-data-input]').should('exist')
        cy.get('[data-cy=backtest-setting-exchange-binance').should('exist')
        cy.get('[data-cy=backtest-setting-exchange-binance-futures').should('exist')
        cy.get('[data-cy=backtest-setting-exchange-bitfinex').should('exist')

        // check Optimization
        cy.get('[data-cy=Optimization-setting]').click()
        // check another tab not exist
        cy.get('[data-cy="backtest-setting-tab"]').should('not.exist')
        cy.get('[data-cy="live-setting-tab"]').should('not.exist')
        // check optimization tab data
        cy.contains('Fitness Function')
        cy.get('[data-cy=optimization-setting-tab').should('exist')
        cy.get('[data-cy=optimization-warmup-candles-input]').should('exist')
        cy.get('[data-cy=ratio-radio-groups]').should('exist')

        // check live tab
        cy.get('[data-cy=Live-setting]').click()
        // check another tab not exist
        cy.get('[data-cy="backtest-setting-tab"]').should('not.exist')
        cy.get('[data-cy="backtest-optimization-tab"]').should('not.exist')
        // check live tab data
        cy.get('[data-cy="setting-live-tab"]').should('include.text', "You can filter the types of events that you want to be logged. Logging is often useful for debugging and recommended. Hence, it doesn't hurt to enable them all: ")
        cy.get('[data-cy="setting-live-tab"]').should('include.text', "Order Submission")
        cy.get('[data-cy="setting-live-tab"]').should('include.text', "1m candles")
        cy.get('[data-cy="live-setting-warmup-candles-input"]').should('exist')
        cy.get('[data-cy="setting-live-tab"]').should('include.text', "Jesse can notify every time something interesting happens so you don't have to monitor your bots 24/7. Currently, Telegram and Discord drivers are supported")
        cy.get('[data-cy="live-setting-enabled-notification"]').should('exist')
        cy.get('[data-cy="setting-live-tab"]').should('include.text', "Errors")
        cy.get('[data-cy="setting-live-tab"]').should('include.text', "Opened Positions")
        cy.get('[data-cy="live-setting-report-notification-timeframe"]').should('have.value', "1h")
        // close setting slide over
        cy.get('#slideover-close-button').click()
        cy.wait(50)

        // test dropdown menu
        cy.get('[data-cy="nav-dropdown-menu-button"]').click()
        cy.get('[data-cy="nav-dropdown-menu-items"]').should('exist')
        // open make strategy slide over
        cy.get('[data-cy="nav-create-strategy"]').click()
        cy.wait(50)
        // check make strategy modal
        cy.get("#make-strategy-modal").should('exist')
        cy.get("#make-strategy-modal").should('include.text', 'Filling this form will create a new strategy class with all the starting methods in it')
        cy.get('#strategy').type('test-strategy')
        cy.get('[data-cy="make-strategy-button"]').click()
        // make strategy message
        cy.get('.notyf__message').should('include.text', 'Success')
        cy.get('.notyf__dismiss-btn').click()
        cy.get('[data-cy="nav-dropdown-menu-button"]').click()
        // check nav menu links url
        cy.get('[data-cy="nav-documentation-link"]').should('have.attr', 'href', 'https://docs.jesse.trade/')
        cy.get('[data-cy="nav-strategies-link"]').should('have.attr', 'href', 'https://jesse.trade/strategies')
        cy.get('[data-cy="nav-help-center-link"]').should('have.attr', 'href', 'https://jesse.trade/help')
    })
})