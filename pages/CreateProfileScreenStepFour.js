import axios from 'axios';
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
//import Camera from "../assets/images/camera.svg";
//import DefaultPicture from "../assets/images/user-frame-missing.svg";
import Json from "../assets/json/en.json";
import { useState, useEffect } from "react";

const CreateProfileScreenStepFour = ({ profileState, navigation, setProfile, userToken, }) => {

    const { gender, accountType, firstName, lastName, nickName, city, language } = profileState;
    const [errorMsg, setErrorMsg] = useState(null);
    const [picture, setPicture] = useState(false);
    const [selectedPicture, setSelectedPicture] = useState(null);
    const { createProfile } = Json;

    const getPermissionAndGetPicture = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === "granted") {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (result.cancelled === false) {
                // if (result.uri.split('.')[result.uri.split('.').length -1] === "png" || result.uri.split('.')[result.uri.split('.').length -1] === "jpg") {
                //     setSelectedPicture(result.uri);
                //     setPicture(true);
                // } else {
                //     setErrorMsg("Wrong format, we only accept PNG/JPG");
                // }
                setSelectedPicture(result.uri);
                setPicture(true);

            } else {
                setErrorMsg(createProfile.fakeUser);
            }
        } else {
            setErrorMsg(createProfile.fakeUser);
        }
    };
    const sendPicture = async () => {
        const tab = selectedPicture.split(".");
        const extension = tab[tab.length - 1];
        const formData = new FormData();
        formData.append("image", {
            uri: selectedPicture,
            name: `my-pic.${extension}`,
            type: `image/${extension}`,
        });
        formData.append("sexe", gender);
        formData.append("isPersonalAccount", accountType === "Personal Account" ? true : false,);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("userName", nickName,);
        formData.append("city", city);
        formData.append("nativeLanguage", language);

        console.log("createProfil step 4 => userToken = ", userToken);

        try {
            const response = await axios.post(
                "https://backoffice.socializus.com/api/profile/createprofile",
                formData,
                {
                    headers: {
                        Authorization: "Bearer " + userToken,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            const str = JSON.stringify(response.data.user);
            console.log("AsyncStorage.setItem(Profile str = ", str);

            await AsyncStorage.setItem("Profile", str);
            setProfile("done");
        } catch (error) {

            console.log("CATCH : ", error.response.status, error.response.message);
        }
    };
    const obj = {
        width: 160,
        text: "Save",
        fakeUser: createProfile.fakeUser,
        setErrorMsg,
        currentPage: "Step 4",
        navigate: navigation.navigate,
        picture,
        setProfile,
        func: sendPicture
    };
    return <View style={styles.profile}>
        <View style={styles.imgContainer}>
            {
                !selectedPicture ? <Image source={require("../assets/images/user-frame-missing.png")} style={{width: 120, height: 120}} /> : <Image
                    style={styles.img}
                    source={{ uri: selectedPicture }}
                />
            }
            <TouchableOpacity
                onPress={() => { getPermissionAndGetPicture(); }}
                style={styles.logo}>
                <Image source={require("../assets/images/camera.png")} style={{width: 25, height: 25}} />
            </TouchableOpacity>
        </View>
        <View style={styles.bar}>
            <View style={[styles.done, { width: selectedPicture ? "100%" : "10%" }]}></View>
        </View>
        {
            (!picture && errorMsg) && <View style={{ width: 300 }}>
                <Text style={styles.error}>
                    {errorMsg}
                </Text>
            </View>
        }
        <View style={styles.btn}>
            <TouchableOpacity
                onPress={() => {
                    if (!picture) {
                        setErrorMsg(createProfile.fakeUser);
                    } else {
                        sendPicture();
                        setProfile("done");
                    }
                }}
                style={styles.bigBtn}>
                <Text style={styles.btnText}>{createProfile.button_2}</Text>
            </TouchableOpacity>
        </View>
    </View >;
};

const styles = StyleSheet.create({
    profile: {
        backgroundColor: "white",
        flex: 1,
        alignItems: "center"
    },
    imgContainer: {
        width: 120,
        height: 120,
        marginTop: 180,
        marginBottom: 23,
    },
    img: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    logo: {
        position: "absolute",
        left: 90,
        top: 75
    },
    bar: {
        width: 195,
        height: 4,
        marginBottom: 25,
        backgroundColor: "black"
    },
    done: {
        backgroundColor: "#59c09b",
        height: 4
    },
    btn: {
        marginTop: 144
    },
    error: {
        color: "red",
        fontWeight: "700",
        fontSize: 14,
        lineHeight: 21,
        textAlign: "center",
        letter: "10%"
    },
    bigBtn: {
        backgroundColor: "#59c09b",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        width: 160
    },
    btnText: {
        color: "white",
        fontSize: 22,
        lineHeight: 33,
        fontWeight: "700",
    },
});
export default CreateProfileScreenStepFour;
