import {View,Text,Button} from 'react-native'

export default ({navigation})=>{
    
    function irParaLogin(){
        navigation.navigate('Login')
    }


    return(
    <View>
        <Text>Tela HOME</Text>
        <Button title='IR PARA TELA LOGIN' onPress={irParaLogin}/>
    </View>
)
}