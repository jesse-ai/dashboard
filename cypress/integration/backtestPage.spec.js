const { default: axios } = require('axios')

describe('test home page', () => {
    beforeEach(() => {
        cy.intercept('post', '/auth', { fixture: 'login.json' }).as('login')
        cy.intercept('post', '/general-info', { fixture: 'generalInfo.json' }).as('generalInfo')
        cy.intercept('post', '/get-config', { fixture: 'getConfig.json' }).as('getConfig')
        cy.intercept('post', '/update-config', { fixture: 'updateConfig.json' }).as('updateConfig')

        sessionStorage.auth_key = null
        axios.defaults.headers.common.Authorization = null
        cy.visit('/')
        cy.contains('Welcome Back!')
        cy.get('input').type('test')
        cy.get('button').click()
        cy.visit('/#/backtest')
        cy.wait(50)
    })
    it('test routes section', () => {
        cy.contains('Routes')
        cy.contains('Import Candles')
        cy.contains('Start in a new tab')

        // check add trading route
        cy.get('#add-route').click()
        cy.wait(50)
        cy.get('#trading-route-exchange1').should('have.value', 'Binance')
        cy.get('#trading-route-symbol1').should('have.value', '')
        cy.get('#trading-route-exchange1').contains('Bitfinex')

        // check trading route delete button
        cy.get('#trading-route-menu-button1').click()
        cy.wait(50)
        cy.get('[name=trading-delete-menu1]').click()
        cy.get('#trading-route-exchange1').should('not.exist');

        // check trading route duplicate
        cy.get('#trading-route-exchange0').select('Coinbase')
        cy.get('#trading-route-menu-button0').click()
        cy.wait(50)
        cy.get('[name=trading-duplicate-menu0]').click()
        cy.get('#trading-route-exchange1').should('have.value', 'Coinbase');

        // check trading route move up
        cy.get('#trading-route-exchange1').select('Binance')
        cy.get('#trading-route-menu-button1').click()
        cy.wait(50)
        cy.get('[name=trading-moveup-menu1]').click()
        cy.get('#trading-route-exchange0').should('have.value', 'Binance');

        // check trading route move down
        cy.get('#trading-route-menu-button0').click()
        cy.wait(50)
        cy.get('[name=trading-movedown-menu0]').click()
        cy.get('#trading-route-exchange1').should('have.value', 'Binance');

        // check add extra route button
        cy.get('#add-extra-route').click()
        cy.get('#extra-route-exchange0').should('have.value', 'Binance')

        // check extra route duplicate
        cy.get('#extra-route-exchange0').select('Coinbase')
        cy.get('#extra-route-menu-button0').click()
        cy.wait(50)
        cy.get('[name=extra-duplicate-menu0]').click()
        cy.get('#extra-route-exchange1').should('have.value', 'Coinbase');

        // check delete button of extra route
        cy.get('#extra-route-menu-button1').click()
        cy.wait(50)
        cy.get('[name=extra-delete-menu1]').click()
        cy.get('#extra-route-exchange1').should('not.exist');

        // check errors of routes
        cy.get('#trading-route-symbol1').type('btcsdescdscds')
        cy.wait(50)
        cy.get('#error0').should('have.text', 'Maximum symbol length is exceeded!')
        cy.get('#error1').should('have.text', 'Symbol parameter must contain "-" character!')

        cy.get('#extra-route-symbol0').type('BTC-USDT')
        cy.get('#error2').should('have.text', 'Extra routes timeframe and routes timeframe must be different')

        cy.get('#trading-route-exchange1').select('Coinbase')
        cy.get('#trading-route-symbol1').clear()
        cy.get('#trading-route-symbol1').type('BTC-USDT')
        cy.get('#error0').contains("each exchange-symbol pair can be traded only once!")
    })

    it('test options, duration and tabs', () => {
        cy.contains('Debug Mode')
        cy.contains('Export JSON')

        cy.get('#start_date').should('have.value', '2021-05-25')

        // press start button
        cy.get('#start-button').click()
        cy.wait(50)
        cy.contains('Tab 1 - 0%')
        cy.contains('seconds remaining')
        cy.get('#backtest-cancel-button').click()
        cy.wait(50)
        cy.contains('Routes')

        // press new tab button
        cy.get('#start-new-tab-button').click()
        cy.wait(50)
        cy.get('#tab1').click()
        cy.wait(50)
        cy.contains('seconds remaining')
        cy.get('#backtest-cancel-button').click()
        cy.wait(50)
        cy.contains('Routes')

        // check remove button
        cy.get('#tab-close-button1').click()
        cy.wait(50)
        cy.get('#tab-close-button1').should('not.exist')
    })
})