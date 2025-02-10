import { TextInput, View, Text } from "react-native";

export const Input = ({ label, textInputConfig }) => {
    return (
        <View>
            <Text>{label}</Text>
            <TextInput {...textInputConfig} />
        </View>
    )
}