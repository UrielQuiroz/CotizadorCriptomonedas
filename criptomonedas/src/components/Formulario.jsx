import { useState, useEffect } from 'react';
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
    const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu moneda', monedas);
    const [ criptomoneda, SelectCriptomoneda ] = useSelectMonedas('Elige tu criptomoneda', crypto);


    useEffect( () => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const rpta = await fetch(url);
            const result = await rpta.json();
            const arrayCryptos = result.Data.map( crypto => {
                
                const objeto = {
                    id: crypto.CoinInfo.Name,
                    nombre: crypto.CoinInfo.FullName
                }

                return objeto;
            })

            setCrypto(arrayCryptos)
        }
        consultarAPI();

    }, [])

    return (
        <form>
            <SelectMonedas />
            <SelectCriptomoneda />
            <InputSubmit 
                type="submit"
                value="Cotizar" />
        </form>
    )
}

export default Formulario
