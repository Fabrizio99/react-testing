import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { server } from "../../../mocks/server"
import { render, screen, waitFor } from '../../../test-utils';
import OrderEntry from '../OrderEntry';

describe('test OrderEntry component', () => { 
    test('handles error for scoops and toppings routes', async() => { 
        server.resetHandlers(
            rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
                res(ctx.status(500))
            ),
            rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
                res(ctx.status(500))
            )
        )

        render(<OrderEntry setOrderPhase={jest.fn()} />)
        

        // screen.debug()
        await waitFor(async () => {
            const alerts = await screen.findAllByRole('alert')
            expect(alerts).toHaveLength(2)
            // console.log('wait for!!')
            // expect(true).toBeTruthy()
        })
    })
    
    test('disable order buttton when there are no scoops ordered', async () => {
        render(<OrderEntry setOrderPhase={jest.fn()} />)
        const vanillaInput = await screen.findByRole('spinbutton', { name: /vanilla/i })
        userEvent.clear(vanillaInput)
        userEvent.type(vanillaInput, '1')

        userEvent.clear(vanillaInput)
        userEvent.type(vanillaInput, '0')

        const orderButton = screen.getByRole('button', { name: 'Order Sundae!' })
        expect(orderButton).toBeDisabled()
    })
 })