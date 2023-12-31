import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import ImgCrypto from './img/imagen-criptos.png'
import Form from './components/Form'
import Result from './components/Result'
import Spinner from './components/Spinner'
import Footer from './components/Footer'

const Div = styled.div`
  height: 1200px;
`
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`
const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`
const Heading = styled.h1`
font-family: 'Lato', sans-serif;
color: #fff;
text-align: center;
font-weight: 700;
margin-top: 80px;
margin-bottom: 50px;
font-size: 34px;

&::after{
  content: '';
  width: 100px;
  height: 6px;
  background-color: #66A2FE;
  display: block;
  margin: 10px auto 0 auto;
}
`

function App() {

  const [currencies, setCurrencies] = useState({})
  const [res, setRes] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect( () =>{
    if(Object.keys(currencies).length > 0){


      const quoteCrypto = async () => {
        setLoading(true)
        setRes({})

        const { currency, cryptoCurrency} = currencies
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}`

        const req = await fetch(url)
        const res = await req.json()

        setRes(res.DISPLAY[cryptoCurrency][currency])

        setLoading(false)
      }
      quoteCrypto();
    }

  }, [currencies])

  return (
    <Div>
      <Container>
        <Image src={ImgCrypto} alt='Crypto Image' />
        <div>
          <Heading>Cotiza Criptomonedas al Instante</Heading>

          <Form 
            setCurrencies = {setCurrencies}
          />

          {loading && <Spinner />}
          {res.PRICE && <Result res={res} />}
        </div>
      </Container>
      <Footer />
      </Div>
  )
}

export default App
