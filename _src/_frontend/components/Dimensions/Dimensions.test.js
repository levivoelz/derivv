import React from 'react'
import Dimensions from './Dimensions'

const DIMENSIONS = {width: 20, height: 20}

describe('Component: Dimensions', () => {
  it.skip('matches snapshot', () => {
    const component = renderer.create(
      <Dimensions dimensions={DIMENSIONS} />
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('adds another one', () => {
    const onAddClick = jest.fn()
    const component = shallow(<Dimensions
      dimensions={DIMENSIONS}
      lastItem
      onAddClick={onAddClick} />
    )

    component.find('.add-dimensions').simulate('click', { onAddClick })
    expect(onAddClick).toBeCalled()
  })

  it('is not able to add another one', () => {
    const onAddClick = jest.fn()
    const component = shallow(<Dimensions
      dimensions={DIMENSIONS}
      onAddClick={onAddClick} />
    )

    expect(component.find('.add-dimensions')).toHaveLength(0)
  })

  it('removes one', () => {
    const onRemoveClick = jest.fn()
    const component = shallow(<Dimensions
      dimensions={DIMENSIONS}
      onRemoveClick={onRemoveClick} />
    )

    component.find('.remove-dimensions').simulate('click', { onRemoveClick })
    expect(onRemoveClick).toBeCalled()
  })

  it('updates width', () => {
    const onChange = jest.fn()
    const component = shallow(<Dimensions
      dimensions={DIMENSIONS}
      onChange={onChange} />
    )

    component.find('[name="width"]').simulate('change', {target: {value: 1}})
    expect(onChange).toBeCalled()
  })

  it('updates height', () => {
    const onChange = jest.fn()
    const component = shallow(<Dimensions
      dimensions={DIMENSIONS}
      onChange={onChange} />
    )

    component.find('[name="height"]').simulate('change', {target: {value: 1}})
    expect(onChange).toBeCalled()
  })
})
