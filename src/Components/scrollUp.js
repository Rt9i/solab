import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';

const ScrollUp = () => {
    const handlePress = () => {
        // Scrolls back to the top when the arrow is pressed
        scrollViewRef.scrollTo({ y: 0, animated: true });
    };

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                scrollEventThrottle={16}
                ref={(ref) => (scrollViewRef = ref)} // Reference to the ScrollView
            >
                {/* Your content goes here */}
            </ScrollView>

            <TouchableOpacity style={styles.arrowContainer} onPress={handlePress}>
                <Text style={styles.arrow}>↑</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ScrollUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    arrowContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        padding: 10,
    },
    arrow: {
        color: 'white',
        fontSize: 24,
    },
});
