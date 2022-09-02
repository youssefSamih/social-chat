import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

import axios from 'axios'

import Fields from "../components/Fields";

import Json from "../assets/json/en.json"
import SelectLanguage from "../components/SelectLanguage";

import { useState, useEffect } from "react"

const CreateProfileScreenStepThree = ({ profileState, navigation }) => {
    const [errorMsg, setErrorMsg] = useState(null)
    const [selected, setSelected] = useState(false)
    const [pressed, setPressed] = useState(false)
    const [index, setIndex] = useState(null)
    const [flags, setFlags] = useState(null)
    const { createProfile } = Json
    const { nickName, city, setCity, setNickName, setLanguage, language } = profileState

    useEffect(() => {
        const fecthFlags = async () => {
            const response = await axios.get("https://backoffice.socializus.com/api/assets/langues")
            setFlags(response.data)
        }
        fecthFlags()
    }, [])
    const component = (typeOfComponent) => {
        const data = [
            { key: '0', value: 'French' },
            { key: '1', value: 'English' },
            { key: '2', value: 'Spanish' },
            { key: '3', value: 'Portugese' },
            { key: '4', value: 'German' },
            { key: '5', value: 'Italian' },
            { key: '6', value: 'Russian' },
            { key: '7', value: 'Chinese' },
            { key: '8', value: 'Indian' },
            { key: '9', value: 'Japanese' },
            { key: '10', value: 'Hebrew' },
            { key: '11', value: 'Hungarian' },
            { key: '12', value: 'Polish' },
            { key: '13', value: 'Romanian' },
            { key: '14', value: 'Greek' },
            { key: '15', value: 'Arab' },
        ];

        const obj = {
            flags,
            data,
            setErrorMsg,
            navigate: navigation.navigate,
            path: "Step 4",
            nickName,
            city,
            setCity,
            setNickName,
            setLanguage,
            language,
            currentPage: "Step 3",
            setState: typeOfComponent === "language" ? setLanguage : typeOfComponent === "city" ? setCity : setNickName,
            state: typeOfComponent === "language" ? language : typeOfComponent === "city" ? city : nickName,
            selected,
            setPressed,
            pressed,
            setSelected,
            setIndex,
            index,
            text: createProfile[typeOfComponent],
        }
        if (typeOfComponent === "language") {
            return <>
                <View style={[styles[typeOfComponent]]}>
                    <SelectLanguage {...obj} />
                </View>
                {
                    (!selected && errorMsg) && <Text style={{ color: "red" }}>{errorMsg}</Text>
                }
            </>
        } else if (typeOfComponent === "button_1") {
            return <View style={styles[typeOfComponent]}>
                <TouchableOpacity
                    onPress={() => {
                        if (!nickName || !city || !selected) {
                            setErrorMsg("Field is required")
                        } else {
                            navigation.navigate("Step 4")
                        }
                    }}
                    style={styles.bigBtn}>
                    <Text style={styles.btnText}>{createProfile[typeOfComponent]}</Text>
                </TouchableOpacity>
            </View>
        }
        else if (typeOfComponent === "titleOfSelectComponent") {
            return <View style={[styles.textContainer, { width: createProfile.nativeLanguage.length * 9, top: (!nickName && !city && errorMsg) ? 403 : ((!city || !nickName) && errorMsg) ? 384 : 364 }]}>
                <Text style={[styles.inputText, { color: (pressed && !selected) ? "red" : "black" }]}>{createProfile.nativeLanguage}</Text>
            </View>
        }
        else {
            return <>
                <View style={[styles[typeOfComponent], { marginBottom: 10 }]}>
                    <Fields {...obj} />
                </View>
                {
                    (typeOfComponent === "city" ? !city : !nickName && errorMsg) && <Text style={{ color: "red" }}>{errorMsg}</Text>
                }
            </>
        }
    }

    return <ScrollView style={styles.profil} contentContainerStyle={{ alignItems: "center" }}>
        {component("nickName")}
        {component("city")}
        {component("language")}
        {component("titleOfSelectComponent")}
        {component("button_1")}
    </ScrollView >
}

const styles = StyleSheet.create({
    profil: {
        backgroundColor: "white",
        flex: 1,
    },
    nickName: {
        marginTop: 234,
    },
    city: {
        marginTop: 15,
    },
    language: {
        marginTop: 15,
    },
    button_1: {
        marginTop: 130
    },
    emote: {
        width: 30,
        height: 30,
        backgroundColor: "yellow",
        position: "absolute",
        left: 10,
        top: 10
    },
    flags: {
        width: 31,
        height: 19,
        backgroundColor: "orange",
        position: "absolute",
        left: 220,
        top: 15
    },
    textContainer: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        position: "absolute",
        left: 95,
    },
    inputText: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: "300",
    },
    bigBtn: {
        backgroundColor: "#59c09b",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        width: 318
    },
    btnText: {
        color: "white",
        fontSize: 22,
        lineHeight: 33,
        fontWeight: "700",
    },
})

export default CreateProfileScreenStepThree