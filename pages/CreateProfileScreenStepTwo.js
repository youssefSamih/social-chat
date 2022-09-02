import { ScrollView, StyleSheet, View, Text } from 'react-native'

import Fields from '../components/Fields'
import LogButton from '../components/LogButtons'


import Json from "../assets/json/en.json"
import { useState } from 'react'


const CreateProfileScreenStepTwo = ({ profileState, navigation }) => {
    const [pressed, setPressed] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [error, setError] = useState(null)

    const { createProfile } = Json
    const { setFirstName, setLastName, firstName, lastName } = profileState

    const obj = {
        width: 318,
        pressed,
        setPressed,
        setErrorMsg,
        navigate: navigation.navigate,
        path: "Step 3",
        firstName,
        lastName,
        currentPage: "Step 2",
        setError
    }

    const component = (positionInput) => {
        return <>
            <View style={styles[positionInput]}>
                <Fields
                    text={createProfile[positionInput === "topInput" ? "firstName" : "lastName"]}
                    setState={positionInput === "topInput" ? setFirstName : setLastName}
                    state={positionInput === "topInput" ? firstName : lastName}
                    {...obj} />
            </View>
            {
                (errorMsg && (positionInput === "topInput" ? !firstName : !lastName)) ? <Text style={{ color: "red" }}>{errorMsg}</Text> :
                    error && <Text Text style={{ color: "red", textAlign: "center", width: 310 }}>{error}</Text>
            }
        </>
    }

    return (<ScrollView style={styles.profil} contentContainerStyle={{ alignItems: 'center' }}>
        {component("topInput")}
        {component("botInput")}
        <View style={styles.btn}>
            <LogButton text={createProfile.button_1} {...obj} />
        </View>
    </ScrollView >)
}

const styles = StyleSheet.create({

    profil: {
        backgroundColor: "white",
        flex: 1,
    },
    topInput: {
        marginTop: 231,

    },

    botInput: {
        marginTop: 20,
    },

    btn: {
        marginTop: 193,
    },
})

export default CreateProfileScreenStepTwo