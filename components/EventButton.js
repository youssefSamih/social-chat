import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export default function EventButton({ type, bgColor, colorText }) {
    return <TouchableOpacity
        style={[styles.btn, { backgroundColor: bgColor }]}>
        <Text style={[(type === "Buy ticket" || type === "Chat") ? styles.buyOrChatType : styles.type, { color: colorText }]}>{type}</Text>
        {
            type === "Buy ticket" ? <View style={styles.emote}></View> :
                type === "Chat" && <View style={styles.secondEmote}></View>
        }
    </TouchableOpacity >;
}

const styles = StyleSheet.create({
    btn: {
        width: 160,
        height: 46,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    buyOrChatType: {
        fontSize: 20,
        lineHeight: 30,
        fontWeight: "700"
    },
    type: {
        fontSize: 14,
        lineHeight: 16,
        fontWeight: "500"
    },
    emote: {
        width: 26,
        height: 32,
        backgroundColor: "orange",
        marginLeft: 10
    },
    secondEmote: {
        width: 38,
        height: 38,
        backgroundColor: "green",
        marginLeft: 20
    },
});
