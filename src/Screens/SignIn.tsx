import React, { useState } from "react";
import { Envelope , Key} from 'phosphor-react-native';

import { Heading, Icon, VStack, useTheme } from "native-base";
import { Input } from "../components/Input";
import Logo from '../assets/logo_primary.svg';
import { Button } from "../components/Button";


export const SignIn = () => {
    
    const { colors } = useTheme();

    const [ name , setName ]  = useState('');
    const [ password , setPassword ]  = useState('');

    return(
        <VStack flex={1} alignItems='center' bg='gray.600' px={8} pt={24}>
            <Logo />
            <Heading color='gray.100' fontSize='xl' mt={20} mb={6}>
                Aecesse sua conta
            </Heading>

            <Input 
                mb={4}
                InputLeftElement={<Icon ml={4} as={<Envelope color={colors.gray[300]} /> } />}
                placeholder='E-mail' 
                onChangeText={setName}
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
            />

        </VStack>
    )
}