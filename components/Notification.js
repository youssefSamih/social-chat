import { StyleSheet, Text, View, Image } from "react-native";
// import Cloche from '../assets/images/cloche.svg';
// import TimeLeft from '../assets/images/time-left.svg';
const Notification = ({ text, date, hour }) => {
    return (
        <View style={[styles.notification, styles.blockInfos, styles.shadowProp]}>
            <View style={[StyleSheet.absoluteFill, { marginTop: 25 }]}>
                <Image source={require("../assets/images/bell.png")} style={{width: 70, height: 40}} />
            </View>
            <View style={styles.blockText}>
                <Text style={styles.notifText}>{text}</Text>
                <View style={styles.blockInfos}>
                    <Image source={require("../assets/images/time-left.png")} style={{width: 10, height: 17, marginRight: 5}} />
                    <Text style={styles.informations}>{date} {hour}</Text>
                </View>
            </View>
        </View>
    );
};

export default Notification;

const styles = StyleSheet.create({
    notification: {
        backgroundColor: "#F8F8F8",
        color: "#000000",
        borderRadius: 10,
        padding: 12,
        marginTop: 12,
        marginBottom: 12,
        marginRight: 19,
        marginLeft: 19,
    },
    shadowProp: {
        shadowOffset: { width: -2, height: 4 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    notifText: {
        fontSize: 13
    },
    blockText: {
        paddingLeft: 60
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
        marginTop: 15
    }
});

/* --------------------------------- */

// import { StyleSheet, Text, Alert } from "react-native";

// const BurgerMenu = () => {
//     const menuBtn = () => {
//         return <Text style={styles.menuBtn}
//             onPress={() => Alert.alert('Simple Button pressed')}
//         >Menu</Text>;
//     };

//     return (
//         { menuBtn }
//     );
// };

// export default BurgerMenu;

// const styles = StyleSheet.create({
//     menuBtn: {
//         backgroundColor: "red"
//     }
// });
