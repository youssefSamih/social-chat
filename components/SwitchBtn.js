import { View, StyleSheet, TouchableOpacity } from "react-native";

const h = 20;
const $ = StyleSheet.create({
    container: {
        width: 40,
        height: h,
        borderRadius: 15,
        backgroundColor: "#ff0000"
    },
    circle: {
        width: (h - 4),
        height: (h - 4),
        borderRadius: 8,
        margin: 2,
        backgroundColor: "#ffffff"
    }

});

const SwitchBtn = ({ state, setState, style }) => {
    if (!style) style = {};
    return <TouchableOpacity style={[$.container, { backgroundColor: state ? "#4caf50" : "#000000" }, style]} onPress={() => { setState(!state); }}>
        <View style={[$.circle, { marginLeft: state ? 21 : 2 }]} />
    </TouchableOpacity>;
};

export default SwitchBtn;
