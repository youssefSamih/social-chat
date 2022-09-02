import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
export default function EditBigSquare({ title, text }) {
    const [active, setActive] = useState(false);

    return (<TouchableOpacity style={[styles.container, { backgroundColor: active ? "#59C09B" : "#F7F7F7" }]} onPress={() => {
        setActive(!active);
    }}>
        <View style={styles.image}></View>
        <Text style={[styles.title, { color: active ? "white" : "black" }]}>{title}</Text>
        <Text style={[styles.text, { color: active ? "white" : "black" }]}>{text} </Text>
    </TouchableOpacity>);
}

const styles = StyleSheet.create({
    container: {
        height: 156,
        width: 160,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "red",
        marginBottom: 20
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 18.75,
        marginBottom: 10,
    },
    text: {
        fontSize: 10,
        lineHeight: 15,
        fontWeight: "400"
    },
});
