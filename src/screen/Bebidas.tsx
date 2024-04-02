import React, { useState, useEffect } from 'react'
import { View, Button, ScrollView, SafeAreaView } from 'react-native'
import CardDog from '../../components/card_dog'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Rodape from '../../components/rodape'

type CarrinhoItem = string;
const cores = {
    preto: '#000000',
    vinho: '#8f1414',
    vermelho: '#f7022e',
    laranja: '#f3450f',
    amarelo: '#fcac03',
};

const HomeScreen = ({ navigation }) => {
    const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([]);

    const adicionarAoCarrinho = async (nome: string) => {
        try {
            let carrinhoAtual = await AsyncStorage.getItem('carrinho')
            if (carrinhoAtual === null) {
                setCarrinho([nome])
            } else {
                carrinhoAtual = JSON.parse(carrinhoAtual)
                setCarrinho([...carrinhoAtual, nome])
            }
        } catch (error) {
            console.error('Erro ao adicionar item ao carrinho:', error)
        }
    }
    

    useEffect(() => {
        async function saveCarrinho() {
            try {
                await AsyncStorage.setItem('carrinho', JSON.stringify(carrinho))
            } catch (error) {
                console.error('Erro ao salvar carrinho:', error)
            }
        }

        saveCarrinho()
    }, [carrinho])

    function irParaHamburgueres() {
        navigation.navigate('Hamburguer')
    }

    useEffect(() => {
        async function loadCarrinho() {
            try {
                const carrinhoSalvo = await AsyncStorage.getItem('carrinho')
                if (carrinhoSalvo !== null) {
                    setCarrinho(JSON.parse(carrinhoSalvo))
                }
            } catch (error) {
                console.error('Erro ao carregar carrinho:', error)
            }
        }
        loadCarrinho()
    }, [])

    return (
        <View>
            <ScrollView>
                <SafeAreaView>
                    <View
                        style={{
                            backgroundColor: cores['vinho'],
                            margin: 0,
                            width: '100%',
                        }}>
                        <CardDog
                            id="4"
                            nome="Suco de Laranja"
                            descricao=' Refrescante e natural, o suco de laranja é uma bebida cítrica e suculenta, apreciada por seu sabor doce e ácido. Feito a partir de laranjas frescas.'
                            adicionarAoCarrinho={adicionarAoCarrinho}
                        />
                        <CardDog
                            id="5"
                            nome="Chá Gelado"
                            descricao='Uma bebida refrescante e versátil, o chá gelado é preparado a partir de chá preto ou chá verde, adoçado a gosto e servido com gelo.'
                            adicionarAoCarrinho={adicionarAoCarrinho}
                        />
                        <CardDog
                            id="6"
                            nome="Coca-Cola"
                            descricao='Uma das bebidas mais icônicas do mundo, a Coca-Cola é uma soda carbonatada com um sabor distintamente doce e uma leve sensação de efervescência.'
                            adicionarAoCarrinho={adicionarAoCarrinho}
                        />
                    </View>
                    <Button title='Ir para Hamburguer' color='#8f1414' onPress={irParaHamburgueres} />
                    <Rodape/>
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

export default HomeScreen
