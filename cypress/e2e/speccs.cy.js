describe("Application", () => {

  it("should open home page by default", () => {
    cy.prepare();

    cy.get("h2").should("contain", "Соберите бургер");
    cy.get("[data-testid=submit_button]").should("be.disabled");
  });

  it("should show ingredient details", () => {
    cy.prepare();

    cy.get("[data-testid=type_bun]").first().click();
    cy.get("[data-testid=close_button]").click();
  });

  it("should drag-and-drop and make order ingredients", () => {
    cy.prepare();

    cy.get("[data-testid=type_bun]").first().trigger("dragstart");
    cy.get("[data-testid=drop_target]").trigger("drop");
    cy.get("[data-testid=submit_button]").should("not.be.disabled");

    cy.get("[data-testid=type_sauce]").first().trigger("dragstart");
    cy.get("[data-testid=drop_target]").trigger("drop");

    cy.get("[data-testid=type_main]").first().trigger("dragstart");
    cy.get("[data-testid=drop_target]").trigger("drop");
    
    cy.get("[data-testid=submit_button]").contains("Оформить заказ").click();
    cy.get("[data-testid=close_button]").click();
  });
});
