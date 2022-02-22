import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import ScoopOptions from '../ScoopOption'
describe("test scoop option component", () => {
    test('indicate if scoop count is non-int or out of range', () => {
        render(<ScoopOptions name="" imagePath="" updateItemCount={jest.fn()} />)
        
        // expect input to be invalid with negative number
        const scoopInput = screen.getByRole("spinbutton")
        userEvent.clear(scoopInput)
        userEvent.type(scoopInput, '-5')
        expect(scoopInput).toHaveClass('is-invalid')
        
        // replace with decimal input
        userEvent.clear(scoopInput)
        userEvent.type(scoopInput, '2.5')
        expect(scoopInput).toHaveClass('is-invalid')
        
        // replace with input that's too high
        userEvent.clear(scoopInput)
        userEvent.type(scoopInput, '12')
        expect(scoopInput).toHaveClass('is-invalid')
        
        // replace with valid input
        userEvent.clear(scoopInput)
        userEvent.type(scoopInput, '2')
        expect(scoopInput).not.toHaveClass('is-invalid')
    })
})