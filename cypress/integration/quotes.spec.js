// write tests here
describe("Stuff works", () => {
    beforeEach(() => {
        cy.visit('http://localhost:1234');

    })

    const textInput = () => cy.get('input[name=text]');
    const authorInput = () => cy.get('input[name=author]');
    const foobarInput = () => cy.get('input[name=foobar]');
    const submitBtn = () => cy.get('button[id="submitBtn"]');
    const cancelBtn = () => cy.get('button[id="cancelBtn"]');

    it('sanity check', () => {
        expect(1 + 2).to.equal(3)
        expect(2.2).not.equal(5)
        expect({}).not.to.equal({})
        expect({}).to.eql({})
    })
    it('The proper elements are showing', () => {
        textInput().should('exist');
        authorInput().should('exist');
        foobarInput().should('not.exist')
        submitBtn().should('exist');
        cancelBtn().should('exist')


        cy.contains('Submit Quote').should('exist')
        cy.contains(/submit quote/i).should('exist')

    })


    describe("Filling out the inputs and cancelling", () => {
        it('Can navigate to the site', () => {
            cy.url().should("include", "localhost")
        })

        it("submit button starts out disabled", () => {
            submitBtn().should("be.disabled")
        })
        it("Can type in the inputs", () => {
            textInput().should("have.value", "").type("CSS rulez").should("have.value", "CSS rulez")
            authorInput()
                .should("have.value", "")
                .type("CRHarding")
                .should("have.value", "CRHarding")
        })
        it("The submit button enables when both inputs are filled out", () => {
            authorInput().type("Sam");
            textInput().type("This is fun!");
            submitBtn().should("not.be.disabled");
        })
        it("the cancel button can reset the inputs and disable the submit button", () => {
            authorInput().type("Sam");
            textInput().type("This is fun!");
            cancelBtn().click();
            authorInput().should("have.value", "");
            textInput().should("have.value", "");
            submitBtn().should("be.disabled")
        })
    })
    describe("Adding/Deleting a new quote", () => {
        it("Submitting quote appends a new object to the dom", () => {
            authorInput().type("Sam");
            textInput().type("This is fun!");
            submitBtn().click()

            cy.contains("This is fun!").siblings("button:nth-of-type(2)").click();
            cy.contains("This is fun!").should("not.exist")

        })
        it("Variation of can submit new quote", () => {
            cy.contains(/have fun/i).should("not.exist")
            textInput().type("CSS rulez")
            authorInput().type("Sam")
            submitBtn().click()
            cy.contains("CSS rulez")
            cy.contains("Sam")
            cy.contains("CSS rulez").next().next().click()
            cy.contains("CSS Rules").should("not.exist")
        })
})
describe("Editing an existing quote", () => {
    it("Can edit quote", () => {
    textInput().type("Lorem ipsum")
    authorInput().type("CRHarding")
    submitBtn().click()
    cy.contains("Lorem ipsum").siblings("button:nth-of-type(1)").click()
    textInput().should("have.value", "Lorem ipsum")
    authorInput().should("have.value", "CRHarding")
    textInput().type(" Dolor sit")
    authorInput().type(" rocks!")
    submitBtn().click()
    cy.contains("Dolor sit")
    cy.contains("Lorem ipsum Dolor sit (CRHarding rocks!)").next().next().click()
    })

})


})