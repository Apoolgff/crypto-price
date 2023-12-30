import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectCurrency from '../hooks/useSelectCurrency'
import { currencies } from '../data/currencies'

const Submit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3% ease;
    margin-top: 30px;

    &:hover{
        background-color: #7A70FE;
        cursor: pointer;;
    }
`

const Form = ({setCurrencies}) => {

    const [cryptos, setCryptos] = useState([])
    const [error, setError] = useState(false)
    const [currency, SelectCurrency] = useSelectCurrency('Selecciona Moneda', currencies)
    const [cryptoCurrency, SelectCryptoCurrency] = useSelectCurrency('Selecciona Criptomoneda', cryptos)

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'

            const req = await fetch(url)
            const res = await req.json()

            const arrayCryptos = res.Data.map(crypto => {
                const object = {
                    id: crypto.CoinInfo.Name,
                    name: crypto.CoinInfo.FullName
                }
                return object
            })
            setCryptos(arrayCryptos)
        }
        consultarAPI();
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        if ([currency, cryptoCurrency].includes('')) {
            setError(true)
            return
        }
        setError(false)
        setCurrencies({
            currency,
            cryptoCurrency
        })
    }

    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}
            <form
                onSubmit={handleSubmit}>
                <SelectCurrency />
                <SelectCryptoCurrency />

                <Submit type='submit' value='Cotizar' />
            </form>
        </>
    )
}

export default Form