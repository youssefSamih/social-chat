import {
    Text,
    ScrollView,
    Image,
    StyleSheet,
    View,
    SafeAreaView,
} from "react-native";

const ConceptScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* <Image
                    style={styles.photo}
                    source={{
                        uri: member.avatar,
                    }}
                /> */}

                <Text>Socializus</Text>
                <Text>To have cultural exchanges</Text>

                <Text>
                    The first application for friendly meetings, in order to help foreigners and organizers to meet and share their activities in their home towns.
                    Everything is geolocated and shared with some cards and mobile notifications, to never miss anything.
                </Text>

            </ScrollView>
        </SafeAreaView>
    );
};

export default ConceptScreen;
