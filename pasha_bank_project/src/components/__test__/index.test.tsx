import React from 'react'
import ReactDOM from 'react-dom'

import { getByTestId, getByLabelText, getByText } from '@testing-library/dom'
import { render, fireEvent } from '@testing-library/react'

import WeatherPage from '../weatherpage'
test('should my dummy function', () => {
    const { getByTestId } = render(<WeatherPage />)


    fireEvent.click(getByTestId("celcius"))
    fireEvent.click(getByTestId("kelvin"))
    fireEvent.click(getByTestId("fehrenheit"))


    expect(getByTestId("celcius")).not.toBeUndefined();
    expect(getByTestId("kelvin")).not.toBeUndefined();
    expect(getByTestId("fehrenheit")).not.toBeUndefined();
    expect(getByTestId("change-location")).not.toBeUndefined()
})


test('should Change Temp Input', () => {

    const { getByTestId } = render(<WeatherPage />)
    const radio = getByTestId('Fahrenheit')
    expect(radio).not.toBeChecked();
    fireEvent.click(radio);
    expect(radio).toBeChecked();
})