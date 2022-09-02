import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function LogButton({
  text,
  width,
  navigate,
  func,
  path,
  setPressed,
  arg,
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        if (setPressed) {
          setPressed(true);
        }
        if (func) {
          func(arg);
        }
        if (path) {
          navigate(path);
        }
      }}
      style={[styles.btn, { width: width }]}
    >
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#59c09b",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  btnText: {
    color: "white",
    fontSize: 22,
    lineHeight: 33,
    // fontFamily: "Poppins",
    fontWeight: "700",
  },
});
