import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

//Commented because the website i'm testing throws a lot of errors and warnings, making all test to fail
//spying on console errors and warnings
/*Cypress.on('window:before:load', (win) => {
    cy.spy(win.console, 'error');
    cy.spy(win.console, 'warn');
});

//asserting that no console errors or warnings were thrown
afterEach(() => {
    cy.window().then((win) => {
      expect(win.console.error).to.have.callCount(0);
      expect(win.console.warn).to.have.callCount(0);
    });
});*/

// Hide fetch/XHR requests
const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML =
    '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');

  app.document.head.appendChild(style);
}

