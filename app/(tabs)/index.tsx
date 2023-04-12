import {Button, StyleSheet, TextInput} from 'react-native';

import {Text, View} from '../../components/Themed';
import React, {useCallback, useEffect, useState} from "react";
import Card from "../../components/Card";
import SearchCard from "../../components/SearchCard";

export default function TabOneScreen() {
    const [pokemons, setPokemons] = useState([]);
    const [pokemon, setPokemon] = useState(null);
    const [numberPoke, setNumberPoke] = useState(null);


    useEffect(() => {
        getPokemons()
    }, [])

    useEffect(() => {
        getPokemonByNumber(numberPoke);
    }, [numberPoke])

    async function getPokemons() {
        try {
            const poke = await fetch('https://pokeapi.co/api/v2/pokemon');

            const data = await poke.json();

            setPokemons(data.results);
        } catch (err) {
        }
    }

    async function getPokemon(url: string) {
        try {
            const poke = await fetch(url);

            const data = await poke.json();

            setPokemon(data);
        } catch (err) {
        }
    }

    async function getPokemonByNumber(number) {
        try {
            const poke = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);

            const data = await poke.json();

            setPokemon(data);
        } catch (err) {
        }
    }

    // async function getPokemonBySearch(string) {
    //     try {
    //         const poke = await fetch(`https://pokeapi.co/api/v2/pokemon/${string}`);
    //
    //         const data = await poke.json();
    //
    //         setPokemon(data);
    //     } catch (err) {
    //     }
    // }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pokemons</Text>
            {/*<TextInput style={styles.input} placeholder={'Введите имя покемона'} onChangeText={debounceSearch} />*/}
            {
                !pokemon &&
                <View style={styles.scrollable}>
                    {pokemons.length ? pokemons.map((pokemon, index) => (
                        <SearchCard key={pokemon.name}
                                    name={pokemon.name}
                                    url={pokemon.url}
                                    getPoke={getPokemon}
                                    index={index + 1}
                                    setNumber={setNumberPoke}
                        />
                    )) : <Text style={styles.p}>Пусто</Text>}
                </View>
            }
            {
                pokemon && <View>
                    <Card
                        name={pokemon.name}
                        image={pokemon.sprites.other['official-artwork'].front_default}
                        height={pokemon.height}
                        weight={pokemon.weight}
                    />
                    <Button title={'next'} onPress={() => setNumberPoke(numberPoke + 1)}/>
                    {
                        numberPoke !== null && numberPoke > 1 &&
                        <Button title={'prev'} onPress={() => setNumberPoke(numberPoke - 1)} />
                    }
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    input: {
        padding: 10,
        border: '1px solid rgba(0, 0, 0, 0.3)',
        borderRadius: 5,
        marginTop: 10,
        color: 'white'
    },
    p: {
        marginTop: 10
    },
    scrollable: {
        marginTop: 10,
        overflowY: 'scroll',
        maxHeight: 400,
        width: 400,
    }
});
