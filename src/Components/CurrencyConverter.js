import React, {useEffect, useState} from 'react'
import CurrencyInput from './CurrencyInput';

const BASE_URL = 'https://api.exchangeratesapi.io/latest';

export default function CurrencyConverter() {

    const [currenyOptions, setCurrencyOptions] = useState([]);
    const [fromCurrency, setFromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();
    const [amount, setAmount] = useState(1);
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
    const [exchangeRate, setExchangeRate] = useState();

    setTimeout(() => {
        setExchangeRate([])
    }, 3600000);

    let toAmount, fromAmount
    if(amountInFromCurrency){
        fromAmount = amount
        toAmount = amount * exchangeRate
    } else {
        toAmount = amount
        fromAmount = amount / exchangeRate
    }


    useEffect(() => {
        fetch(BASE_URL)
        .then(response => response.json())
        .then (result => {
            const firstCurrency = Object.keys(result.rates)[0]
            setCurrencyOptions([result.base, ...Object.keys(result.rates)])
            setFromCurrency(result.base)
            setToCurrency(firstCurrency)
            setExchangeRate(result.rates[firstCurrency])
        });
    }, [])

    useEffect(() => {
        if(fromCurrency != null && toCurrency != null && fromCurrency != toCurrency){
            fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(response => response.json())
        .then(result => setExchangeRate(result.rates[toCurrency]))
        }
        

    }, [fromCurrency, toCurrency])

    function handleFromAmountChange(e){
        setAmount(e.target.value)
        setAmountInFromCurrency(true)
    }
    
    function handleToAmountChange(e){
        setAmount(e.target.value)
        setAmountInFromCurrency(false)
    }


    return (
        <>
            <h1>Convert</h1>
            <CurrencyInput 
            options={currenyOptions}
            selectedCurrency = {fromCurrency}
            onChangeCurrency = {e => setFromCurrency(e.target.value)}
            onChangeAmount={handleFromAmountChange}
            amount={fromAmount}
            />
            
            <div className="equals">=</div>
            <CurrencyInput 
            options={currenyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency = {e => setToCurrency(e.target.value)} 
            onChangeAmount={handleToAmountChange}
            amount={toAmount}
            />
        </>
    )
}
