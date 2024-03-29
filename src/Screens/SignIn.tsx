import React, { useEffect, useState } from "react";
import { Envelope , Key} from 'phosphor-react-native';
import Logo from '../assets/logo_primary.svg';
import { Heading, Icon, VStack, useTheme } from "native-base";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import auth from '@react-native-firebase/auth';
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";


export const SignIn = () => {
    
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [ isLoading , setIsLoading ]  = useState(false);
    const [ email , setEmail ]  = useState('');
    const [ password , setPassword ]  = useState('');

    const handleSignIn = () => {
        if(!email || !password){
            return Alert.alert('Entrar', 'Informe Email e Senha')
        }
        setIsLoading(true);
        auth()
        .signInWithEmailAndPassword(email , password)
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
            if(error.code === 'auth/invalid-email'){
                return Alert.alert('Entrar' , 'Email ou senha incorretos');
            }
            if(error.code === 'auth/wrong-password'){
                return Alert.alert('Entrar' , 'Email ou senha incorretos');
            }
            if(error.code === 'auth/user-not-found'){
                return Alert.alert('Entrar' , 'Email ou senha incorretos');
            }
        })
    }

    const handlePageSignUp = () => {
        navigation.navigate('signup');
    }
    
    return(
        <VStack flex={1} alignItems='center' bg='gray.600' px={8} pt={24}>
            <Logo />
            <Heading color='gray.100' fontSize='xl' mt={20} mb={6}>
                Acesse sua conta
            </Heading>

            <Input 
                mb={4}
                InputLeftElement={<Icon ml={4} as={<Envelope color={colors.gray[300]} /> } />}
                placeholder='E-mail' 
                onChangeText={setEmail}
            />
            <Input 
                mb={8}
                secureTextEntry
                InputLeftElement={<Icon ml={4} as={<Key color={colors.gray[300]} /> } />}
                placeholder='Senha'
                onChangeText={setPassword}
            />

            <Button 
                title="Entrar"
                w='full'
                mb={5}
                onPress={handleSignIn}
                isLoading={isLoading}
            />

            <Button 
                title="Cadastro"
                w='full'
                bg='primary.700'
                onPress={handlePageSignUp}
            />  

        </VStack>
    )
}