import userEvent from "@testing-library/user-event"
import { render, screen } from "../../../test-utils"
import Options from "../Options"
import OrderEntry from "../OrderEntry"

describe('test behaviuor of updating pricing', () => { 
    test('update scoop subtotal when scoops change', async() => { 
        render(<Options optionType="scoops" />);
        const subtotal = screen.getByText('Scoops total: $', {exact: false})
        const vanillaInput = await screen.findByRole('spinbutton', { name: /vanilla/i })
        const chocolateInput = await screen.findByRole('spinbutton', { name: /chocolate/i })
        
        // check subtotal starts at 0
        expect(subtotal).toHaveTextContent('0.00')

        // update vanilla scoops to 1 and check the subtotal
        userEvent.clear(vanillaInput)
        userEvent.type(vanillaInput, '1')
        expect(subtotal).toHaveTextContent('2.00')

        // update chocolate scoops to 2 and check the subtotal
        userEvent.clear(chocolateInput)
        userEvent.type(chocolateInput, '2')
        expect(subtotal).toHaveTextContent('6.00')
    })
    
    test('update topping subtotal when toppings change', async() => { 
        render(<Options optionType="toppings"/>);
        const subtotal = screen.getByText('Toppings total: $', {exact: false})
        const mmTopping = await screen.findByRole('checkbox', {name: /M&Ms/i})
        const hotFudgeTopping = await screen.findByRole('checkbox', { name: /Hot fudge/i })
        
        // check subtotal starts at 0
        expect(subtotal).toHaveTextContent('0.00')

        // add m&m topping
        userEvent.click(mmTopping)
        expect(subtotal).toHaveTextContent('1.50')
        
        // add hot fudge topping
        userEvent.click(hotFudgeTopping)
        expect(subtotal).toHaveTextContent('3.00')

        //remove hot fudge topping
        userEvent.click(hotFudgeTopping)
        expect(subtotal).toHaveTextContent('1.50')
    })
    
    test('grand total updates if scoops is added first', async() => { 
        render(<OrderEntry setOrderPhase={jest.fn()}/>)
        
        const total = screen.getByText('Grand total: $', { exact: false })
        const vanillaScoop = await screen.findByRole('spinbutton', { name: /vanilla/i })
        const hotFudgeTopping = await screen.findByRole('checkbox', {name : /hot fudge/i})

        // total starts at 0
        expect(total).toHaveTextContent('0.00')

        // add scoops first
        userEvent.clear(vanillaScoop)
        userEvent.type(vanillaScoop, '2')
        expect(total).toHaveTextContent('4.00')
        
        // add topping
        userEvent.click(hotFudgeTopping)
        expect(total).toHaveTextContent('5.50')
    })

    test('grand total updates if topping is added first', async() => { 
        render(<OrderEntry setOrderPhase={jest.fn()}/>)
        
        const total = screen.getByText('Grand total: $', { exact: false })
        const hotFudgeTopping = await screen.findByRole('checkbox', {name : /hot fudge/i})
        const vanillaScoop = await screen.findByRole('spinbutton', { name: /vanilla/i })

        // total starts at 0
        expect(total).toHaveTextContent('0.00')

        // add topping first
        userEvent.click(hotFudgeTopping)
        expect(total).toHaveTextContent('1.50')
        
        // add scoops 
        userEvent.clear(vanillaScoop)
        userEvent.type(vanillaScoop, '2')
        expect(total).toHaveTextContent('5.50')
    })

    test('grand total updates if item is removed', async() => { 
        render(<OrderEntry setOrderPhase={jest.fn()}/>)
        
        const total = screen.getByText('Grand total: $', { exact: false })
        const hotFudgeTopping = await screen.findByRole('checkbox', {name : /hot fudge/i})
        const vanillaScoop = await screen.findByRole('spinbutton', { name: /vanilla/i })

        // total starts at 0
        expect(total).toHaveTextContent('0.00')

        // add topping first
        userEvent.click(hotFudgeTopping)
        expect(total).toHaveTextContent('1.50')
        
        // add scoops 
        userEvent.clear(vanillaScoop)
        userEvent.type(vanillaScoop, '2')
        expect(total).toHaveTextContent('5.50')

        // remove topping
        userEvent.click(hotFudgeTopping)
        expect(total).toHaveTextContent('4.00')
    })
 })