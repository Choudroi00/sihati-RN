import { TextInput, TextInputProps } from "react-native";
import { primaryRadius, secondaryColor } from "../../utils/constants";
import { Icon, IconNode, View } from "lucide-react-native";


interface XInputProps extends TextInputProps {
    variant?: keyof typeof XInputVariants;
    icon: IconNode
    
}   

const XInputVariants = {
    base: ` w-full px-4 py-6 ${primaryRadius} shadow-sm `,
    primary: '',
    secondary: ` bg-[#F4F4F4] `,
    ghost: '',
    default: ` bg-[${secondaryColor}] `,
}

export default function XInput(props : XInputProps) {
    
    return (
        <View className={`${XInputVariants.base} flex flex-row justify-center items-center ${XInputVariants[props.variant ?? 'default']} gap-4 overflow-hidden `} >
            <Icon iconNode={props.icon} color={'black'} size={24} ></Icon>
            <TextInput {...props} className={`h-full flex-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-800 text-sm font-medium`} >

            </TextInput>
        </View>
    )
}
