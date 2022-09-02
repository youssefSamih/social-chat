import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";

const HeaderRight = () => {
  const navigation = useNavigation();
  return (
    <Button
      onPress={() => {
        navigation.navigate("Edit Activity");
      }}
      title="Create Activity"
      color="#fff"
    />
  );
};

export default HeaderRight;
