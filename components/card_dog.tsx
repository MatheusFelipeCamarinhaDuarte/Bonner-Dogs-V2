import React, { version } from 'react';
import { Image, View, Text, StyleSheet, Button, Alert } from 'react-native';

const images: { [key: string]: any } = {
    '1': require('../assets/hot-dog-1.jpg'),
    '2': require('../assets/hot-dog-2.jpg'),
    '3': require('../assets/hot-dog-3.jpg'),
    '4': require('../assets/bebidas-1.jpg'),
    '5': require('../assets/bebidas-2.jpg'),
    '6': require('../assets/bebidas-3.jpg'),
    '7': require('../assets/sobremesa-1.jpg'),
    '8': require('../assets/sobremesa-2.jpg'),
    '9': require('../assets/sobremesa-3.jpg')
};

const CardDog = (props) => {
    const imagem = images[props.id];

    const adicionarCarrinho = async () => {
        try {
            await props.adicionarAoCarrinho(props.nome);
        } catch (error) {
            console.error('Erro ao adicionar ao carrinho:', error);
        }
    };

    const cores = {
        preto: '#000000',
        vinho: '#8f1414',
        vermelho: '#f7022e',
        laranja: '#f3450f',
        amarelo: '#fcac03',
    };

    const styles = StyleSheet.create({
        container_menu: {
            backgroundColor: cores['amarelo'],
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            margin: 20,
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
        container_descricao: {
            backgroundColor: cores['laranja'],
            justifyContent: 'center',
            alignItems: 'center',
            margin: 20,
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
        txtTitulo: {
            fontSize: 25,
            fontWeight: 'bold',
        },
    });

    return (
        <View style={styles.container_menu}>
            <View style={{ margin: 20 }}>
                <Image
                    style={{ height: 300, width: 300, borderRadius: 20 }}
                    source={imagem}
                />
            </View>
            <Text style={styles.txtTitulo}>{props.nome}</Text>
            <View style={styles.container_descricao}>
                <Text style={{ textAlign: 'justify', margin: 15 }}>{props.descricao}</Text>
            </View>

            <View
                style={{
                    height: 50,
                    width: 250,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                }}>

                <Button
                    title="Adicionar ao carrinho"
                    color="#8f1414"
                    onPress={adicionarCarrinho}
                />
            </View>
        </View>
    );
};

export default CardDog;
