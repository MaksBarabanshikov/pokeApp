import React from 'react';
import {Text, View} from "./Themed";
import {Image, StyleSheet} from "react-native";


export default function Card({ name, image, height, weight }: { name: string, image: any, height: number, weight: number }) {
    return (
        <View>
            <Text style={styles.title}>{name}</Text>
            <Image style={styles.image} source={image} />
            <Text>height: { height }</Text>
            <Text>weight: { weight }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
      fontSize: 25,
        textAlign: 'center',
        marginTop: 20
    },
    image: {
        width: 400,
        height: 400,
    },
    name: {
        fontSize: 16,
    },
});