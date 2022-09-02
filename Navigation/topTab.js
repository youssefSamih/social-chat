import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

const TopTab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const TopNav = ({ arg }) => {
  // console.log(arg);
  return (
    <TopTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarScrollEnabled: arg.length > 3 ? true : false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#59C09B",
        },
        tabBarLabelStyle: {
          fontWeight: "bold",
        },
        tabBarActiveBackgroundColor: "#59C09B",
        tabBarInactiveBackgroundColor: "gray",
      }}
    >
      {arg.map((elem, index) => {
        return (
          <TopTab.Screen
            key={index}
            name={`topNav${elem.link}`}
            options={{
              tabBarLabel: elem.link,
            }}
          >
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name={elem.link}
                  options={{
                    headerShown: false,
                  }}
                >
                  {elem.link !== "My activities" || "Activities"
                    ? elem.to
                    : () => <TopNav arg={elem.topNavArg} />}
                </Stack.Screen>
              </Stack.Navigator>
            )}
          </TopTab.Screen>
        );
      })}
    </TopTab.Navigator>
  );
};

export default TopNav;
