import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function LogSmallButton({ width, text, navigate, path }) {
  return (
    <TouchableOpacity
      onPress={() => {
        if (path) {
          navigate(path);
        }
      }}
      style={[styles.btn, { width: width }]}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  btn: {
    height: 37,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
    color: "#59C09B",
  },
});
