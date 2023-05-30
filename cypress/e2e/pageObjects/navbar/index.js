import { elements as navbarElements } from './elements';
import { elements as checkoutPageElements } from '../checkoutPage/elements';

class navbar {

    clickWhatsNewSection() {
        cy.get(navbarElements.whatsNewButton).click();
    }

    clickWomenSection() {
        cy.get(navbarElements.womenDropdown).click();
    }

    clickWomenTopsSection() {
        cy.get(navbarElements.womenDropdown).trigger('mouseover').then(() => {
            cy.get(navbarElements.womenTopsButton).click().then(() => {
                cy.wait(1000);
            });
        })
    }

    clickOpenMiniCartButton() {
        cy.get(navbarElements.miniCartButton).click();
    }

    clickProceedToCheckoutButton() {
        cy.get(navbarElements.miniCartContentDiv).should('be.visible');
        cy.get(navbarElements.proceedToCheckoutButton).click().then(() => {
            cy.get(checkoutPageElements.emailInput).should('be.visible');
        });
    }

    assertProductIsShown() {
        cy.get(navbarElements.miniCartContentDiv).should('be.visible');
    }

} export default new navbar();