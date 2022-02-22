import { render } from '@testing-library/react'
import { OrderDetailsProvider } from '../contexts/OrderDetails'

const customRender = (ui, options) =>
  render(ui, {wrapper: OrderDetailsProvider, ...options})

export * from '@testing-library/react'
export {customRender as render}