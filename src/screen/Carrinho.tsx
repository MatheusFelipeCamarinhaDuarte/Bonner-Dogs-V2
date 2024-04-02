import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet,ScrollView } from 'react-native'
import { Button, Card } from 'react-native-paper'

const cores = {
    preto: '#000000',
    vinho: '#8f1414',
    vermelho: '#f7022e',
    laranja: '#f3450f',
    amarelo: '#fcac03',
}
export default ({ navigation }) => {

    const [carrinho, setCarrinho] = useState([])

    function irParaLogin() {
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

    const excluirCarrinho = async () => {
        try {
            await AsyncStorage.removeItem('carrinho')
            setCarrinho([]) 
                } catch (error) {
            console.error('Erro ao excluir carrinho:', error)
        }
    }
    const finalizar = async () =>{
        excluirCarrinho()
        alert('Você finalizou suas compras!')
    }

    return (
        <View style={styles.carrinho}>
            <Card style={styles.card}>
                <View style={styles.header}>
                    <ScrollView>

                    <Button onPress={excluirCarrinho} textColor='#f7022e'>EXCLUIR CARRINHO</Button>

                    {Array.from(new Set(carrinho)).map((item, index) => {
                        const quantidade = carrinho.filter((i) => i === item).length
                        return (
                            <View key={index} style={styles.item}>
                                <Text style={styles.title}>{`${item} (x${quantidade})`}</Text>
                            </View>
                        )
                    })}
                    <View style={{backgroundColor:'black'}}>
                        <Button onPress={finalizar} textColor='#f7022e'>Finalizar compra</Button>
                    </View>
                    </ScrollView>
                </View>
            </Card>
        </View>
    )
}



const styles = StyleSheet.create({
    carrinho: {
        width: '100%',
        height: '100%',
        backgroundColor: cores['vinho'],
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 50,
        paddingBottom: 50,
        alignItems: 'center',

    },
    card: {
        backgroundColor: cores['amarelo'],
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height:700,
        width:350
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    item: {
        backgroundColor: cores['laranja'],
        padding: 20,
        marginVertical: 8,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})