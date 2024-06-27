import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const UserItem = props => {
    const { name, nikNames, points, products, userID } = props;
    return (
        <View style={styles.container}>
            <Text style={styles.txt}>{`name: ${name}`}</Text>
            <Text style={styles.txt}>{`nikNames: ${nikNames}`}</Text>
            <Text style={styles.txt}>{`points: ${points}`}</Text>
            <Text style={styles.txt}>{`products: ${products}`}</Text>
            <Text style={styles.txt}>{`userID: ${userID}`}</Text>
        </View>
    );
};

export default UserItem;

const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
    },
    txt: {
        fontSize: 20,
        color: 'black',
    },
});