import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'

export default function TwinEventButton({ attendee }) {
    return <View style={styles.container}>
        <TouchableOpacity style={[styles.btn, { backgroundColor: "#9D9D9D", marginRight: 8 }]}>
            <Text style={[styles.text, { color: "white" }]}>Invite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: attendee ? "#FF0000" : "#23e937" }]}>
            <Text style={[styles.text, { color: attendee ? "white" : "black" }]}>{attendee ? "Unsubscribe" : "Participate"}</Text>
        </TouchableOpacity>
    </View >
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    btn: {
        width: 137,
        height: 40,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontWeight: "500",
        fontSize: 18,
        lineHeight: 35,
    },
})