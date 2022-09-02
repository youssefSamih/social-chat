import { StyleSheet, TouchableOpacity, Text, View, Image, TextInput, } from "react-native";
import { useState } from "react";
// import Eye from "../assets/images/eye.svg";
// import Arobase from "../assets/images/arobase.svg";
// import TextFrame from "../assets/images/textFrame.svg";
// import City from "../assets/images/city.svg";
// import Birthday from "../assets/images/birthday.svg";
// import Password from "../assets/images/password.svg";

export default function Fields({ text, state, setState, pressed }) {
    const [isSecure, setIsSecure] = useState(((text === "Password" || text === "Confirm Password") ? true : false));
    return <View>
        <TextInput
            value={state}
            onChangeText={(text) => {
                setState(text);
            }}
            style={[styles.input, {
                paddingLeft: (text === "Price" || text === "Buy Tickets Link") ? 10 : 50, width: text === "Price" ? 104 : 319,
                borderColor: (!state && pressed) ? "red" : "black"
            }]} secureTextEntry={isSecure} />
        <View style={
            [styles.textContainer,
            {
                width: (text === "Whatsapp group link" || text === "Page" || text === "Group" || text === "Meetup" || text === "Telegram") ?
                    70 + 20 : text.length * 9,
                left: (text === "Price" || text === "Buy Tickets Link") ? 18 : 45
            }
            ]}>

            {text === "WhatsApp group link" && <Image style={{ marginRight: 5, width: 20, height: 20 }} source={require("../assets/images/whatsapp.png")} resizeMode="contain" />}
            {text === "Page" && <Image style={{ marginRight: 5, width: 20, height: 20 }} source={require("../assets/images/fbPage.png")} resizeMode="contain" />}
            {text === "Group" && <Image style={{ marginRight: 5, width: 20, height: 20 }} source={require("../assets/images/fbGroup.png")} resizeMode="contain" />}
            {text === "Meetup" && <Image style={{ marginRight: 5, width: 20, height: 20 }} source={require("../assets/images/Meetup.png")} resizeMode="contain" />}
            {text === "Telegram" && <Image style={{ marginRight: 5, width: 20, height: 20 }} source={require("../assets/images/Telegram.png")} resizeMode="contain" />}

            {/* (text === "Whatsapp group link" || text === "Page" || text === "Group" || text === "Meetup" || text === "Telegram") && <View style={styles.logoInput}></View>
             */}

            <Text style={(text !== "Whatsapp group link" && text !== "Group" && text !== "Page" && text !== "Meetup" && text !== "Telegram" && text !== "Other Link") ? [styles.inputText, { color: !state && pressed ? "red" : "black" }] :
                (text === "Page" || text === "Group" ? [styles.inputTextSocial, { color: (!state && pressed) ? "red" : "#3b5998" }] :
                    text === "Meetup" ? [styles.inputTextSocial, { color: (!state && pressed) ? "red" : "#ed1c40" }] :
                        text === "Telegram" ? [styles.inputTextSocial, { color: (!state && pressed) ? "red" : "black" }] :
                            text === "Autre Link" ? [styles.inputTextSocial, { fontWeight: "0" }, { color: (!state && pressed) ? "red" : "black" }] :
                                text && [styles.inputTextSocial, { color: (!state && pressed) ? "red" : "black" }])}>{text}</Text>
        </View>
        {
            text === "Email" ? <View style={styles.imageSquare}><Image source={require("../assets/images/arobase.png")} style={{width:30, height:30}}/></View> :
                (text === "First Name" || text === "Last Name" || text === "Nickname, Brand or User name") ? <View style={styles.imageSquare}><Image source={require("../assets/images/text-frame.png")} style={{width:30, height:30}} /></View> :
                    text === "City" ? <View style={styles.imageSquare}><Image source={require("../assets/images/city.png")} style={{width:30, height:30}}/></View> :
                        text === "Birthday" ? <View style={styles.imageSquare}><Image source={require("../assets/images/birthday.png")} style={{width:30, height:30}} /></View> :
                            (text === "Password" || text === "Confirm Password") && <View style={styles.imageSquare}><Image source={require("../assets/images/locker.png")} style={{width:30, height:30}} /></View>
        }
        {
            (text === "Password" || text === "Confirm Password") && <TouchableOpacity style={styles.eye} onPress={() => {
                setIsSecure(!isSecure);
            }}><Image source={require("../assets/images/eye.png")} style={{width:30, height:30}} /></TouchableOpacity>
        }
    </View >;
}

const styles = StyleSheet.create({
    input: {
        height: 45,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 15,
    },
    textContainer: {
        bottom: 37,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        position: "absolute"
    },
    imageSquare: {
        width: 30,
        height: 30,
        bottom: 8,
        left: 10,
        position: "absolute"
    },
    logoInput: {
        width: 17,
        height: 17,
        backgroundColor: "purple",
        marginRight: 10
    },
    inputText: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: "300",
    },
    inputTextSocial: {
        fontSize: 10,
        lineHeight: 13.19,
        fontWeight: "700",
    },
    eye: {
        width: 30,
        height: 30,
        left: 275,
        bottom: 7,
        position: "absolute",
    },
});
