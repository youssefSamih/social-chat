import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { Calendar } from "react-native-calendars";

//import CalendarIcon from "../assets/images/calendar.svg";

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
    backgroundColor: "#fff",
    fontSize: 12,
    textAlign: "center",
    position: "absolute",
    zIndex: 1,
    left: 50,
    top: -10,
  },
  icon: {
    margin: 3,
    marginLeft: 10,
    width: 30,
    height: 30,
  },
  result: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  calendar: {
    position: "absolute",
  },
});

const CalendarField = ({ width, title, state, setState, style }) => {
  if (!style) style = {};

  const [showCalendar, setShowCalendar] = useState(false);

  const date = new Date();
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  const month = ("" + (date.getMonth() + 1)).padStart(2, "0");
  const today = year + "-" + month + "-" + day;

  const onChooseDate = (day) => {
    setState(day.dateString);
    setShowCalendar(false);
  };

  return (
    <View style={[$.container, { width: width, zIndex: 500 }, style]}>
      <Text style={[$.title, { width: title.length * $.title.fontSize * 0.8 }]}>
        {title}
      </Text>
      <TouchableOpacity
        style={$.btnContainer}
        onPress={() => {
          setShowCalendar(true);
        }}
      >
        <Image
          source={require("../assets/images/calendar.png")}
          style={$.icon}
        />
        <Text style={[$.result, { width: width - 50 }]}>{state}</Text>
      </TouchableOpacity>
      {showCalendar && (
        <Calendar
          style={[$.calendar, { width: width }]}
          initialDate={today}
          minDate={today}
          onDayPress={onChooseDate}
        />
      )}
    </View>
  );
};

export default CalendarField;
