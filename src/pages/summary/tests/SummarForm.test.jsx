import userEvent from "@testing-library/user-event"
import { render, screen, waitFor, waitForElementToBeRemoved } from "../../../test-utils"
import SummaryForm from "../SummaryForm"

describe('test summary form', () => { 
    test('first conditions', () => {
        render(<SummaryForm setOrderPhase={jest.fn()} />)
        
        const button = screen.getByRole('button')
        expect(button).toBeDisabled()
    })

    test('checkbox enables button on first click and disables on second click', () => {
        render(<SummaryForm setOrderPhase={jest.fn()} />)
        
        const checkBox = screen.getByRole('checkbox', { name: /I agree to/i })
        const button = screen.getByRole('button', { name: /confirm order/i })
        userEvent.click(checkBox)
        expect(button).toBeEnabled()
    })

    test('popover responds to hover', async() => { 
        render(<SummaryForm setOrderPhase={jest.fn()} />)
        const termsAndConditions = screen.getByText(/terms and conditions/i)
        const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i)
        
        // popover is hidden at first
        expect(nullPopover).not.toBeInTheDocument()
        
        // user hover terms and conditions
        userEvent.hover(termsAndConditions)
        const popover = screen.queryByText(/no ice cream will actually be delivered/i)
        await waitFor(() => {
            expect(popover).toBeInTheDocument()
        })

        userEvent.unhover(termsAndConditions)

        await waitForElementToBeRemoved(() => screen.queryByText(/no ice cream will actually be delivered/i))
    })
 })