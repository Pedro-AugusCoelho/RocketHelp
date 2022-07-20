import { Heading, HStack, IconButton, Text, useTheme, VStack, FlatList, Center } from "native-base";
import { ChatTeardropText, SignOut } from "phosphor-react-native";
import { useState , useEffect } from "react";

import Logo from '../assets/logo_secondary.svg';
import { Filter } from '../components/Filter';
import { Order, OrderProps } from "../components/Order";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { DateFormat } from "../utils/FirestoreDateFormat";
import { Loading } from "../components/Loading";


export const Home = () =>{

    const navigation = useNavigation();
    
    const {colors} = useTheme();

    const [loading , setLoading] = useState(true);
    const [statusSelected , setStatusSelected] = useState<'open' | 'closed'>('open');
    const [orders , setOrders] = useState<OrderProps[]>([] as OrderProps[]);

    const handleNewOrder = () => {
        navigation.navigate('new');
    }
    const handleOpenDetails = (orderId:string) => {
        navigation.navigate('details' , {orderId}); 
    }
    const handleLogout = () => {
        auth()
        .signOut()
        .catch(error => {
            console.log(error)
            Alert.alert('Sair' , 'Não foi possível sair.')
        })
    }
    
    useEffect(() => {
        setLoading(true);
        const subscriber = firestore()
        .collection('orders')
        .where('status' , '==' , statusSelected)
        .onSnapshot(snapshot =>{
            const data = snapshot.docs.map(doc => {
                const { patrimony , description , status, created_at } = doc.data();
                return {
                    id:doc.id,
                    patrimony,
                    description,
                    status,
                    when:DateFormat(created_at)
                }
            })
            setOrders(data);
            setLoading(false);
        })
        return subscriber;
    },[statusSelected]);
    
    return(
    <VStack flex={1} pb={8} bg='gray.700'>
        <HStack
            w='full'
            justifyContent='space-between'
            alignItems='center'
            bg='gray.600'
            pt={12}
            pb={5}
            px={6}

        >
            <Logo />
            <IconButton icon={<SignOut size={26} color={colors.gray[300]} />} onPress={handleLogout}/>
        </HStack>

        <VStack flex={1} px={6} >
        
            <HStack w='full' mt={8} mb={4} justifyContent='space-between' alignItems='center' > 
                <Heading color='gray.100'>
                    Meus Chamados
                </Heading>
                <Text color='gray.200'>{orders.length}</Text>
            </HStack>
           
           <HStack space={3} mb={8}>
                <Filter 
                    type='open' 
                    title='Em Andamento' 
                    onPress={() => setStatusSelected('open')}
                    isActive={statusSelected === 'open'}
                />
                
                <Filter 
                    type='closed' 
                    title='Finalizados' 
                    onPress={() => setStatusSelected('closed')}
                    isActive={statusSelected === 'closed'}
                />
            
            </HStack>

            {!loading 
            ?(
                <FlatList 
                    data={orders}
                    keyExtractor={item => item.id}
                    renderItem={({item}) =><Order data={item} onPress={() => handleOpenDetails(item.id)} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom:100}}
                    ListEmptyComponent={() => {
                        return (
                            <Center>
                                <ChatTeardropText color={colors.gray[300]} size={40} />
                                <Text color='gray.300' fontSize='xl' mt={6} textAlign='center'>
                                    Você ainda não possui{'\n'}
                                    Solicitações {statusSelected === 'open' ? 'em aberto' : 'finalizados' }
                                </Text>
                            </Center>
                        )
                    }}
                />
            )
            : <Loading />
            }

            <Button title='Nova solicitação' onPress={handleNewOrder} />
        
        </VStack>

    
    </VStack>
    )
}