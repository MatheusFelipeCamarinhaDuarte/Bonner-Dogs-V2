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
                            id="7"
                            nome="Sorvete"
                            descricao='O sorvete é uma sobremesa gelada feita a partir de ingredientes como leite, creme, açúcar e aromatizantes, batidos juntos e congelados para criar uma textura suave e cremosa.'
                            adicionarAoCarrinho={adicionarAoCarrinho}
                        />
                        <CardDog
                            id="8"
                            nome="Bolo"
                            descricao='O bolo é uma sobremesa popular feita a partir de uma mistura de ingredientes como farinha, ovos, açúcar e gordura, assada até ficar macia e fofa.'
                            adicionarAoCarrinho={adicionarAoCarrinho}
                        />
                        <CardDog
                            id="9"
                            nome="Gelatina"
                            descricao='A gelatina é uma sobremesa leve e gelatinosa feita a partir de gelatina em pó, que é dissolvida em água quente e depois refrigerada até solidificar.'
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
