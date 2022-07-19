import { VStack } from 'native-base';
import { Header } from '../components/Header';
import { useRoute } from '@react-navigation/native';


type RootParams = {
  orderId:string;
}


export const Details = () => {

  const Route = useRoute();
  const { orderId } = Route.params as RootParams;

  return (
    <VStack flex={1} bg='gray.700'>
        <Header title='Solicitação' />
    </VStack>
  );
}