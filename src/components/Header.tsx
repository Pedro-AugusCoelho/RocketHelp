import { useNavigation } from '@react-navigation/native';
import { Heading, HStack, Icon, IconButton, useTheme , StyledProps } from 'native-base';
import { CaretLeft } from 'phosphor-react-native';


type HeaderProps  = StyledProps & {
    title:string;
}


export const Header = ({title , ...rest}:HeaderProps) => {
  

    const navigation = useNavigation();
    const { colors } = useTheme();

    const handleGoBack = () => {
        navigation.goBack();
    }

    return (
    <HStack
        w='full'
        justifyContent='space-between'
        alignItems='center'
        bg='gray.600'
        pb={6}
        pt={12}
        {...rest}
    >
        <IconButton onPress={handleGoBack} icon={<Icon as={<CaretLeft color={colors.gray[200]} size={24} />} />} />
        <Heading color='gray.100' textAlign='center' flex={1} fontSize='lg' ml={-6} >
            {title}
        </Heading>
    </HStack>
  );
}