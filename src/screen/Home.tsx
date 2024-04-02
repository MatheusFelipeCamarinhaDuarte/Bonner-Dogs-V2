import React, { useState, useEffect } from 'react'
import { View, Text, Button, ScrollView, SafeAreaView } from 'react-native'
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

    function irParaBebidas() {
        navigation.navigate('Bebidas')
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
                            id="1"
                            nome="Hot Dog infantil"
                            descricao='Pão de banha, 1 salsicha (sadia), purê de batata caseiro, salada de repolho, maionese, ketchup, mostarda, batata palha'
                            adicionarAoCarrinho={adicionarAoCarrinho}
                        />
                        <CardDog
                            id="2"
                            nome="Hot Dog Duplo"
                            descricao='Pão de banha, 2 salsichas (sadia), purê de batata caseiro, salada de repolho, milho, ervilha, cheedar, catupiry, maionese, ketchup, mostarda, batata palha'
                            adicionarAoCarrinho={adicionarAoCarrinho}
                        />
                        <CardDog
                            id="3"
                            nome="Hot Dog no Prato"
                            descricao='Pão de banha, 3 salsichas (sadia), purê de batata caseiro, salada de repolho, milho, ervilha, cheedar, catupiry, maionese, ketchup, mostarda, queijo ralado, batata palha'
                            adicionarAoCarrinho={adicionarAoCarrinho}
                        />
                    </View>
                    <Button title='Ir para Bebidas' color='#8f1414' onPress={irParaBebidas} />
                    <Rodape/>
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

export default HomeScreen
