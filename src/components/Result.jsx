import styled from "@emotion/styled"

const Container = styled.div`
    color: #FFF;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
`
const Image = styled.img`
    display: block;
    width: 120px;
`

const Text = styled.p`
    font-size: 18px;
    span{
        font-weight: 700;
    }
`
const Price = styled.p`
    font-size: 24px;
    span{
        font-weight: 700;
    }
    
`

const Result = ({res}) => {
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = res

  return (
    <Container>
        <Image src={`https://cryptocompare.com/${IMAGEURL}`} alt="Crypto Image" />
        <div>
            <Price>El precio es de: <span>{PRICE}</span></Price>
            <Text>Precio mas alto del dia: <span>{HIGHDAY}</span></Text>
            <Text>Precio mas bajo del dia: <span>{LOWDAY}</span></Text>
            <Text>Variacion ultimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Text>
            <Text>Ultima Actualizacion: <span>{LASTUPDATE}</span></Text>
        </div>
    </Container>
  )
}

export default Result