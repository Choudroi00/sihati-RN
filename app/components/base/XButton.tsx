import { remapProps } from "nativewind";
import { PressableProps } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";



interface XButtonProps extends PressableProps {
    variant?: string;
}


const XButtonVariants = {
    primary: {
        backgroundColor: 'blue',
    },
    secondary: {
        backgroundColor: 'green',
    },
    ghost: {
        backgroundColor: 'red',
    },
}




const XButton = () => {
    
    return (
        <View className="" >

        </View>
    )
}

