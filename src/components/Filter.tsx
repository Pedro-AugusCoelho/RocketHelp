import { Text , Button , IButtonProps , useTheme  } from "native-base";


type FilterProps = IButtonProps & {
    title:string;
    isActive?:boolean;
    type: 'open' | 'closed';
}

export const Filter = ({isActive = false , title , type , ...rest}:FilterProps) => {
    
    const { colors } = useTheme();

    const colorType = type === 'open' ? colors.secondary[700] : colors.green[700];
    
    return(
        <Button
            variant='outline'
            borderWidth={isActive ? 1 : 0}
            borderColor={colorType}
            bgColor='gray.600'
            flex={1}
            size='sm'
            {...rest}
        >
            <Text color={isActive ? colorType : 'gray.300'} fontSize='xs' textTransform='uppercase'>
                {title}
            </Text>
        </Button>
    )
}