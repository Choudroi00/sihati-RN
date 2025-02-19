import { Pressable, PressableProps } from "react-native";
import { primaryColor, primaryRadius, secondaryColor } from "../../utils/constants";



interface XButtonProps extends PressableProps {
    variant?: keyof typeof XButtonVariants;
}


const XButtonVariants = {
    base: ` flex items-center justify-center px-8 py-4 text-white font-medium text-md ${primaryRadius} `,
    primary: '',
    secondary: ` bg-[${secondaryColor}] `,
    ghost: '',
    default: ` bg-[${primaryColor}] `,
}




const XButton = (props : XButtonProps) => {
    
    return (
        <Pressable {...props} className={`${XButtonVariants.base} ${XButtonVariants[props.variant ?? 'default']} ${props.className}`} >
            { props.children }
        </Pressable>
    )
}

