/// <reference types="cypress" />

import * as element from "@helper/elements";
import * as route from "@helper/route";
import { ROUTES } from "@test/const/routes";
import * as homePage from "@test/page/home.page";
import * as careerPage from "@test/page/career.page";
import * as knowledgeCenterPage from "@test/page/knowledge-center.page";
import * as contactUsPage from "@test/page/contact-us.page";
import * as careerData from "@test/data/career.data";
import * as contactUsData from "@test/data/contact-us.data";
import * as knowledgeCenterData from "@test/data/knowledge-center.data";
import * as assert from "@helper/assert";
beforeEach(() => {
  route.visit(ROUTES.home);
});
describe("Landing page test", () => {
  it("Tracking your job", () => {
    element.click(careerPage.careerButton);
    element.click(careerPage.trackingButton);
    element.fillFilled(careerPage.idTrackingInput, careerData.FILTER.keyword);
    element.fillFilled(careerPage.emailInput, careerData.FILTER.keyword);
    element.click(careerPage.submitButton);
    cy.screenshot();
  });
  it("Project Manager", () => {
    assert.shouldContainText(homePage.projectManagerLabel, "Project Manager");
    element.click(homePage.projectManagerButton);
    assert.shouldBeVisible(homePage.projectManagerList);
  });
  it("Knowledge Center", () => {
    element.click(knowledgeCenterPage.knowledgeCenterButton);
    element.click(knowledgeCenterPage.buttonCategory);
    element.click(knowledgeCenterPage.bpmnButton);
    assert.shouldContainText(knowledgeCenterPage.buttonCategory, knowledgeCenterData.FILTER.category);
  });
  it("Career", () => {
    element.click(careerPage.careerButton);
    element.fillFilled(careerPage.filterInput, careerData.FILTER.keyword);
    element.click(careerPage.searchButton);
    assert.shouldBeVisible(careerPage.image);
  });
  it("Contact Us", () => {
    element.click(contactUsPage.contactUsButton);
    element.fillFilled(contactUsPage.inputName, contactUsData.DATA.name);
    element.fillFilled(contactUsPage.inputNickName, contactUsData.DATA.nickname);
    element.fillFilled(contactUsPage.inputEmail, contactUsData.DATA.email);
    element.fillFilled(contactUsPage.inputPhone, contactUsData.DATA.phone);
    element.fillFilled(contactUsPage.inputInstitution, contactUsData.DATA.company);
    element.fillSelect(contactUsPage.selectSubject, contactUsData.DATA.subject);
    element.fillFilled(contactUsPage.inputMessage, contactUsData.DATA.message);
    cy.wait(500);
    cy.get("iframe[src*=recaptcha]")
      .its("0.contentDocument")
      .should((d) => d.getElementById("recaptcha-token").click());
    element.click(contactUsPage.submitButton);
  });
  it("Tracking Progress", () => {
    element.click(contactUsPage.contactUsButton);
    element.click(contactUsPage.trackingBtn);
    element.fillFilled(contactUsPage.inputIdTracking, contactUsData.DATATRACKING.id);
    element.click(contactUsPage.trackingSubmitBtn);
    cy.screenshot();
  });
});
