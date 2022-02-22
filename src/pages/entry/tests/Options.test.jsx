import { render, screen } from '../../../test-utils'
import Options from '../Options'
describe('test Options component', () => {
    test('display images for each scoop option from server', async() => { 
        render(<Options optionType="scoops" />)
        
        // test: find images
        // the name for images is "alt" attribute
        // the regex is to test that the image's name ends with "scoop"
        const scoopImages = await screen.findAllByRole('img', {name: /scoop$/i})
        expect(scoopImages).toHaveLength(2)

        // test: confirm alt text of images
        const altTextImages = scoopImages.map(s => s.alt)
        expect(altTextImages).toEqual(['Chocolate scoop', 'Vanilla scoop'])
     })

    test('display images for each topping option from server', async() => { 
        render(<Options optionType="toppings" />)
        const toopingImages = await screen.findAllByRole('img', { name: /topping$/i })
        
        expect(toopingImages).toHaveLength(3)

        const altTextImages = toopingImages.map(t => t.alt)

        expect(altTextImages).toEqual(['Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',])
     })
})