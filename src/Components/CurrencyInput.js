import React from 'react';

export default function CurrencyInput(props) {
    const{
        options,
        selectedCurrency,
        onChangeCurrency,
        amount,
        onChangeAmount
    } = props

    return (
        <div>
            <input type="number" value={amount} onChange={onChangeAmount}></input>
            <select value={selectedCurrency} onChange={onChangeCurrency}>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}
