const { default: axios } = require('axios')

describe('test home page', () => {
    beforeEach(() => {
        sessionStorage.auth_key = null
        axios.defaults.headers.common.Authorization = null

        cy.intercept('post', '/auth', { fixture: 'login.json' }).as('login')
        cy.intercept('post', '/general-info', { fixture: 'generalInfo.json' }).as('generalInfo')
        cy.intercept('post', '/get-config', { fixture: 'getConfig.json' }).as('getConfig')
        cy.intercept('post', '/update-config', { fixture: 'updateConfig.json' }).as('updateConfig')
    })
    it('test content', () => {
        cy.visit('/')
        cy.contains('Welcome Back!')
        cy.get('input').type('test')
        cy.get('button').click()

        cy.wait(100)
        cy.contains('Routes')
        cy.contains('Import Candles')
        cy.contains('Start in a new tab')

    })
})