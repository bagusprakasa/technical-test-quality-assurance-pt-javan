export const BASE_URL = {
  DEFAULT: Cypress.env("baseUrl")
};
export function visit(routes) {
  cy.visit(BASE_URL.DEFAULT + routes);
}
