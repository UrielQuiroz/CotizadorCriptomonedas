import { useState, useEffect } from 'react';
import Error from './Error';

import styled from '@emotion/styled';

import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas';

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase; 
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = () => {

    const [ crypto, setCrypto ] = useState([]);
    const [ error, setError ] = useState(false);
    
    const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu moneda', monedas);
    const [ criptomoneda, SelectCriptomoneda ] = useSelectMonedas('Elige tu criptomoneda', crypto);


    useEffect( () => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const rpta = await fetch(url);
            const result = await rpta.json();
            const arrayCryptos = result.Data.map( cryp => {
                
                const objeto = {
                    id: cryp.CoinInfo.Name,
                    nombre: cryp.CoinInfo.FullName
                }

                return objeto;
            })

            setCrypto(arrayCryptos)
        }
        consultarAPI();

    }, [])


    const handleSubmit = e => {
        e.preventDefault();

        if ([moneda, criptomoneda].includes('')) {
            setError(true);
            return;
        }
        setError(false);
        console.log('Paso la validacion')
    }


    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error> }

            <form
                onSubmit={handleSubmit}>
                <SelectMonedas />
                <SelectCriptomoneda />
                <InputSubmit 
                    type="submit"
                    value="Cotizar" />
            </form>
        </>
    )
}

export default Formulario
