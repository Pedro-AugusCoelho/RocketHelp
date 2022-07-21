import React, { useEffect, useState } from "react";
import { Envelope , Key} from 'phosphor-react-native';
import Logo from '../assets/logo_primary.svg';
import { Heading, Icon, VStack, useTheme, Box } from "native-base";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import auth from '@react-native-firebase/auth';
import { Alert } from "react-native";
import { Header } from "../components/Header";
import { useNavigation } from "@react-navigation/native";


export const SignUp = () => {
    
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [ isLoading , setIsLoading ]  = useState(false);
    const [ email , setEmail ]  = useState('');
    const [ password , setPassword ]  = useState('');
    const [ passwordConfirm , setPasswordConfirm ] = useState('');

    const handleSignUp = () => {
        if(!email || !password || !passwordConfirm){
            console.log(email ,' ', password,' ', passwordConfirm);
            return Alert.alert('Entrar', 'Informe Email e Senha')
        }
        if(password !== passwordConfirm){
            return Alert.alert('Cadastrar' , 'As senhas não são iguais')
        }
        if(password.length <= 5){
            return Alert.alert('Cadastrar' , 'Senha muito curta');
        }
        setIsLoading(true);
        auth().createUserWithEmailAndPassword(email , password)
        .then(() => {
            navigation.goBack();
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false);
            if(error.code === 'auth/invalid-email'){
                Alert.alert('Cadastrar' , 'E-mail informado esta inválido')
            }
        })
    }


    return(
        <VStack flex={1} alignItems='center' bg='gray.600' px={8} pt={24}>
            <Box px={2} bg='gray.600'>
                <Header title='Cadastro' pb={0} pt={0} />
            </Box>

            <Box mt={12}>
                <Logo/>
            </Box>
            
            <Heading color='gray.100' fontSize='xl' mt={20} mb={6}>
               Cadastre uma conta
            </Heading>


            <Input 
                mb={4}
                InputLeftElement={<Icon ml={4} as={<Envelope color={colors.gray[300]} /> } />}
                placeholder='E-mail' 
                onChangeText={setEmail}
            />
            <Input 
                mb={4}
                secureTextEntry
                InputLeftElement={<Icon ml={4} as={<Key color={colors.gray[300]} /> } />}
                placeholder='Senha'
                onChangeText={setPassword}
            />
            <Input 
                mb={8}
                secureTextEntry
                InputLeftElement={<Icon ml={4} as={<Key color={colors.gray[300]} /> } />}
                placeholder='Digite a senha novamente'
                onChangeText={setPasswordConfirm}
            />

            <Button 
                title="Cadastrar"
                w='full'
                onPress={handleSignUp}
                isLoading={isLoading}
            />

        </VStack>
    )
}