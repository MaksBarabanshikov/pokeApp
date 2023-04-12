import React from 'react';
import {Text, View} from "./Themed";
import {Button, StyleSheet} from "react-native";

export default function SearchCard({name, url, getPoke, index, setNumber}: {
    name: string,
    url: string,
    getPoke: any,
    index: number,
    setNumber: any
}) {

    const handlePress = () => {
        getPoke(url);
        setNumber(index);
    }

    return (
        <Button title={name} onPress={() => handlePress()}/>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 5,
        width: '100%',
        marginBottom: 5,
        border: '1px solid black',
        borderRadius: 10,
    },
    name: {
        fontSize: 16,
    },
});