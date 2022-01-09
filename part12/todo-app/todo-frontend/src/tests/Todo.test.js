import { render } from '@testing-library/react';
import Todo from '../Todos/Todo';
import '@testing-library/jest-dom/extend-expect';

test('renders Todo content', () => {
  const component = render(
    <Todo text="Testing rendering" />
  )

  expect(component.container).toHaveTextContent(
    'Testing rendering'
  )
})