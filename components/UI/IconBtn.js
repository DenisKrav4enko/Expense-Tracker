import { Pressable, View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

function IconBtn({ icon, size, color, onPress }) {
    return (
        <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.btnContainer}>
                <Ionicons name={icon} size={size} color={color} />
            </View>
        </Pressable>
    )
}

export default IconBtn

const styles = StyleSheet.create({
    btnContainer: {
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 8,
        marginVertical: 2,
    },
    pressed: {
        opacity: 0.75,
    },
})