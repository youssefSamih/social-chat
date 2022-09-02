import { TextInput, View, Text, StyleSheet } from "react-native";

export default function MultilineFields({ lines, title, setState, state }) {
  return (
    <View>
      <TextInput
        value={state}
        onChangeText={(text) => {
          setState(text);
        }}
        multiline={lines ? true : false}
        numberOfLines={lines ? lines : null}
        style={styles.multiline}
      />
      <View style={[styles.textContainer, { width: title.length * 9 }]}>
        <Text>{title}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  multiline: {
    borderWidth: 1,
    borderRadius: 15,
    width: 319,
    textAlignVertical: "top",
    paddingLeft: 20,
    paddingTop: 10,
  },
  textContainer: {
    position: "absolute",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    left: 25,
    top: -11,
  },
});
