import { View, TextInput, StyleSheet, Text } from "react-native";

const $ = StyleSheet.create({
    container: {
        position: "relative",
        height: 40,
    },
    btnContainer: {
        position: "relative",
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: "#fff",
        height: 40,
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        backgroundColor: '#fff',
        fontSize: 12,
        textAlign: "center",
        position: "absolute",
        zIndex: 1,
        left: 50,
        top: -10
    },
    input: {

        width: "90%",
        marginLeft: 10,
        fontSize: 16
    }
});

const InputField = ({ title, width, state, setState, style }) => {

    if (!style) style = {};

    return <View style={[$.container, { width: width, zIndex: 500 }, style]}>
        <Text style={[$.title, { width: (title.length * $.title.fontSize * 0.65) }]}>{title}</Text>
        <View style={$.btnContainer} >
            <TextInput style={$.input} value={state} onChangeText={(text) => setState(text)} />
        </View>
    </View>;

};

export default InputField;
