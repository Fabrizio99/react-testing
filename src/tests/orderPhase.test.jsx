const { render, screen } = require("@testing-library/react")
const { default: userEvent } = require("@testing-library/user-event")
const { default: App } = require("../App")

describe('test order phase', () => {
    test('Order phase for happy path', async() => {
        render(<App />)
        
        const vanillaScoop = await screen.findByRole('spinbutton', {name: /vanilla/i})
        const chocolateScoop = screen.getByRole('spinbutton', { name: /chocolate/i })
        const hotFudgeTopping = screen.getByRole('checkbox', { name: /hot fudge/i })
        
        // add 1 vanilla scoop
        userEvent.clear(vanillaScoop)
        userEvent.type(vanillaScoop, '1')

        // add 2 chocolate scoops
        userEvent.clear(chocolateScoop)
        userEvent.type(chocolateScoop, '2')

        // add hot fudge
        userEvent.click(hotFudgeTopping)

        // find and click "Order sundae"
        const orderSundaeButton = screen.getByRole('button', { name: /order sundae!/i })
        userEvent.click(orderSundaeButton)

        // check order Summary
        const summaryTitle = screen.getByRole('heading', { name: /Order Summary/i })
        expect(summaryTitle).toBeInTheDocument()

        // check subtotals
        const scoopsSubtotal = screen.getByRole('heading', { name: "Scoops: $6.00" })
        expect(scoopsSubtotal).toBeInTheDocument()
        const toppingSubtotal = screen.getByRole('heading', { name: "Toppings: $1.50" })
        expect(toppingSubtotal).toBeInTheDocument()

        // check items
        const items = screen.getAllByRole('listitem')
        const nameItems = items.map(i => i.textContent)
        expect(nameItems).toEqual(['1 Vanilla', '2 Chocolate', 'Hot fudge'])

        // click on terms and conditions
        const termsAndConditions = screen.getByRole('checkbox', { name: /I agree to/i })
        userEvent.click(termsAndConditions)
        const confirmOrderButton = screen.getByRole('button', { name: 'Confirm order' })
        userEvent.click(confirmOrderButton)
        
        // confirmation page

        // show loading
        const loadingText = screen.queryByText('Loading')
        expect(loadingText).toBeInTheDocument()

        const orderNumber = await screen.findByText(/order number/i)
        expect(orderNumber).toBeInTheDocument()

        const createNewOrderButton = screen.getByRole('button', { name: /create new order/i })
        userEvent.click(createNewOrderButton)

        // check that scoops and toppings have been reset

        const scoopsSubtotalReset = await screen.findByText('Scoops total: $0.00')
        expect(scoopsSubtotalReset).toBeInTheDocument()
        const toppingsSubtotalReset = await screen.findByText('Toppings total: $0.00')
        expect(toppingsSubtotalReset).toBeInTheDocument()
    })
})