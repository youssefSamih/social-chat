import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const BurgerButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View>
                <View style={styles.line} />
                <View style={styles.line} />
                <View style={styles.line} />
            </View>
            <View style={styles.menuBtn}>
                <Text style={styles.menuText}>Menu</Text>
            </View>
        </TouchableOpacity>
    );
};

export default BurgerButton;

const styles = StyleSheet.create({
    menuText: {
        textTransform: 'uppercase',
        color: "#ffffff",
        fontSize: 9
    },
    line: {
        borderBottomColor: '#ffffff',
        marginBottom: 4,
        borderBottomWidth: 2,
    }
});
