import { useState , useEffect } from 'react';
import { HStack, VStack , useTheme , Text, ScrollView , Box } from 'native-base';
import { Header } from '../components/Header';
import { useRoute } from '@react-navigation/native';
import { OrderProps } from '../components/Order';
import firestore from '@react-native-firebase/firestore'
import { OrderFirestoreDTO } from '../DTOs/OrderDTO';
import { DateFormat } from '../utils/FirestoreDateFormat';
import { Loading } from '../components/Loading';
import { CircleWavyCheck , DesktopTower, Hourglass , ClipboardText } from  'phosphor-react-native';
import { CardDetails } from '../components/CardDatails';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


type RootParams = {
  orderId:string;
}

type OrderDatails = OrderProps & {
  description:string;
  solution:string;
  closed:string;
}


export const Details = () => {

  const Route = useRoute();
  const { orderId } = Route.params as RootParams;
  const [isLoading , setIsLoading] = useState(true);
  const [solution , setSolution] = useState('');
  const [order , setOrder] = useState<OrderDatails>({} as OrderDatails);
  const navigation = useNavigation();
  const {colors} = useTheme();

  const handleOrderClose = () => {
    if(!solution){
      Alert.alert('Solução' , 'Digite uma solução')
    }
    firestore()
    .collection<OrderFirestoreDTO>('orders')
    .doc(orderId)
    .update({
      status:'closed',
      solution,
      closed_at: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      Alert.alert('Solicitação' , 'Solicitação encerrada com sucesso');
      navigation.goBack();
    })
    .catch(error => {
      console.log(error);
      Alert.alert('Solicitação' , 'Não foi possivel encerrar a solicitação')
    })

  }

  useEffect( () => {
    firestore()
    .collection<OrderFirestoreDTO>('orders')
    .doc(orderId)
    .get()
    .then(doc => {
      const {created_at,description,patrimony,status,closed_at,solution} = doc.data();
      const closed = closed_at ? DateFormat(closed_at) : null;
      setOrder({
        id:doc.id,
        patrimony,
        description,
        status,
        solution,
        when: DateFormat(created_at),
        closed
      })
      setIsLoading(false);
    })
  },[]);

  if(isLoading){return <Loading />};
  
  return (
    <VStack flex={1} bg='gray.700'>
      <Box px={6} bg='gray.600'>
        <Header title='Solicitação' />
      </Box>

        <HStack bg='gray.500' justifyContent='center' p={4}>
          {
            order.status === 'closed'
            ? <CircleWavyCheck size={22} color={colors.green[300]} />
            : <Hourglass size={22} color={colors.secondary[700]} />
          }
          <Text
            fontSize='sm'
            color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
            ml={2}
            textTransform='uppercase'

          >
            {order.status === 'closed' ? 'Finalizado'  : 'Em andamento'}
          </Text>
        </HStack>

        <ScrollView mx={5} showsVerticalScrollIndicator={false}>
          <CardDetails
            title='equipamento'
            description={`Patrimônio ${order.patrimony}`}
            icon={DesktopTower}
          />

          <CardDetails
            title='descrição do problema'
            description={order.description}
            icon={ClipboardText}
            footer={`Resgistrado em` + order.when}
          />

          <CardDetails
            title='solução'
            description={order.solution}
            icon={CircleWavyCheck}
            footer={order.closed && `Encerrado em ${order.closed}`}
          >
            {
              order.status === 'open' &&
              <Input 
                placeholder='Descrição da solução'
                onChangeText={setSolution}
                h={24}
                textAlignVertical='top'
                multiline
              />
            }
            
          </CardDetails>
        </ScrollView>

        {
          order.status === 'open' && <Button title='Encerrar Solicitação' m={5} onPress={handleOrderClose}  />
        }
    </VStack>
  );
}