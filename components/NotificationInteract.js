import { StyleSheet, Text, View, Image } from "react-native";
// import RightArrow from '../assets/images/right-arrow.svg';
// import TimeLeft from '../assets/images/time-left.svg';

const NotificationInteract = ({ text, date, hour }) => {
    return (
        <View style={[styles.notification, styles.blockInfos, styles.shadowProp]}>
            <View style={styles.blockText}>
                <Text style={styles.notifText}>{text}</Text>
                <View style={styles.blockInfos}>
                    <Image source={require("../assets/images/time-left.png")} style={{width: 10, height: 17, marginRight: 8}} />
                    <Text style={styles.informations}>{date} {hour}</Text>
                </View>
            </View>
            <View style={[StyleSheet.absoluteFill, styles.icon]}>
                <Image source={require("../assets/images/right-arrow.png")} style={{height: 40}} />
            </View>
        </View>
    );
};

export default NotificationInteract;

const styles = StyleSheet.create({
    notification: {
        backgroundColor: "#F8F8F8",
        color: "#000000",
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 8,
        paddingLeft: 7,
        marginTop: 12,
        marginBottom: 12,
        marginRight: 19,
        marginLeft: 19,
        height: 106
    },
    shadowProp: {
        shadowOffset: { width: -2, height: 4 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    notifText: {
        fontSize: 15,
        marginBottom: 12
    },
    blockText: {
        paddingRight: 60
    },
    blockInfos: {
        marginTop: 5,
        flexDirection: "row"
    },
    informations: {
        fontSize: 12,
        color: "#5B5B5B"
    },
    icon: {
        marginTop: 25,
        marginLeft: "85%"
    }
});
