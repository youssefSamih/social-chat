import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
// import Male from "../assets/images/male.svg";
// import Female from "../assets/images/female.svg";

const TwinSelectButton = ({ firstTitle, secondTitle, profileState, setIsSelect, setActive, setSecondActive, active, secondActive }) => {

    const component = (positionBtn, title) => {
        return <TouchableOpacity style={[styles[positionBtn], {
            backgroundColor: positionBtn === "firstBtn" ? (active ? "#ACE0CD" : "white") : positionBtn === "secondBtn" && secondActive ? "#ACE0CD" : "white"
        },
        { justifyContent: (title === "Male" || title === "Female") ? null : 'center' }]}
            onPress={() => {
                const { setGender, setAccountType } = profileState;
                setIsSelect(true);
                if (positionBtn === "firstBtn") {
                    setSecondActive(false);
                    setActive(true);
                    if (title === "Male") {
                        setGender("male");
                    } else {
                        setAccountType(title);
                    }
                } else {
                    setSecondActive(true);
                    setActive(false);
                    if (title === "Female") {
                        setGender("female");
                    } else {
                        setAccountType(title);
                    }
                }
            }}>
            {title === "Male" ? <View style={styles.logo}><Image source={require("../assets/images/male.png")} style={{width: 25, height: 25}}/></View> :
                title === "Female" && <View style={styles.logo}><Image source={require("../assets/images/female.png")} style={{width: 25, height: 25}} /></View>}
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>;
    };
    return <View style={styles.btnContainer}>
        {component("firstBtn", firstTitle)}
        {component("secondBtn", secondTitle)}
    </View>;

};

const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: 'row',
    },
    firstBtn: {
        width: 157,
        height: 37,
        borderWidth: 1,
        borderRightWidth: 0.5,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        alignItems: 'center',
        flexDirection: 'row'
    },
    secondBtn: {
        width: 157,
        height: 37,
        borderWidth: 1,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'center',
        flexDirection: 'row'
    },
    text: {
        fontSize: 16,
        lineHeight: 19.2,
        fontWeight: "600",
    },
    logo: {
        width: 24,
        height: 24,
        marginRight: 20,
        marginLeft: 18
    }
});

export default TwinSelectButton;
