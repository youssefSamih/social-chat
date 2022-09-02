import { useState } from "react";
import { View, Text, PanResponder, Dimensions } from "react-native";

const BasicNumericStepper = ({ width, minVal, maxVal, state, setState, style }) => {

    if (!style) style = {};

    const circleRadius = 10;
    const circleSize = circleRadius * 2;
    const screenW = Dimensions.get("window").width;
    const componentH = 50;
    const labelW = 25;
    const componentW = width;
    const margeX = (screenW - width) * 0.5;
    const barW = width - labelW * 2;

    const [x, setX] = useState(labelW + ((state - minVal) / (maxVal - minVal)) * barW);

    const $ = ({

        //necessiterait trop de travail de déplacer ce bloc en dehors du composant 
        //(idéalement il faudrait le faire mais pas le temps)

        container: { width: width, height: componentH },

        leftLabel: { top: 20, left: 0, width: labelW, textAlign: "center", fontSize: 16, position: "absolute" },
        rightLabel: { top: 20, right: 0, width: labelW, textAlign: "center", fontSize: 16, position: "absolute" },
        valueLabel: { top: -20, left: -labelW * 0.5 + circleRadius, width: labelW, textAlign: "center", fontSize: 16, position: "absolute" },

        circle: { top: 20, width: circleSize, height: circleSize, borderRadius: circleSize * 0.5, zIndex: 10, position: "absolute", backgroundColor: "#59c09b" },

        bgOff: { width: barW, height: 4, position: "absolute", backgroundColor: "#a6a6a6", left: labelW, top: 3 + (componentH) * 0.5 },
        bgOn: { width: barW, height: 4, position: "absolute", backgroundColor: "#2f44ff", left: labelW, top: 3 + (componentH) * 0.5, zIndex: 5 }
    });

    const panResponder = PanResponder.create({

        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderMove: (event) => {
            let px = event.nativeEvent.pageX - margeX;
            const py = event.nativeEvent.pageY;

            if (px < labelW) px = labelW;
            else if (px > labelW + barW - circleSize) px = labelW + barW - circleSize;

            setX(px);
            setState(Math.floor(minVal + ((px - labelW) / (barW - circleSize)) * (maxVal - minVal)));
        },
    });

    return <View style={[$.container, style]} {...panResponder.panHandlers}>
        <View style={[$.circle, { left: x }]} pointerEvents="none" >
            <Text pointerEvents="none" style={$.valueLabel}>{state}</Text>
        </View>

        <Text pointerEvents="none" style={$.leftLabel} >{minVal}</Text>
        <Text pointerEvents="none" style={$.rightLabel}>{maxVal}</Text>
        <View style={$.bgOff} pointerEvents="none" />
        <View style={[$.bgOn, { width: (x - labelW) }]} pointerEvents="none" />
    </View>;
};

export default BasicNumericStepper;
