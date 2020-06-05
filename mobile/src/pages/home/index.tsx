import React, { useEffect, useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, Image, StyleSheet, Text, ImageBackground, SafeAreaView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as ExpoLocation from 'expo-location';


const Home = () => {

    const navigation = useNavigation();
    // const worldMapData = require('city-state-country');
    // const countriesList = (worldMapData.getAllCountries() as Country[]).map(country => { return { value: country.name, label: country.name } });


    const [selectedCountry, setSelectedCountry] = useState<string>();
    const [selectedState, setSelectedState] = useState<string>();
    const [selectedCity, setSelectedCity] = useState<string>();

    function handleNavigateToPoints() {
        navigation.navigate("Points", {
            state: selectedState,
            city: selectedCity
        });
    }

    useEffect(() => {

        async function loadPosition() {
            const { status } = await ExpoLocation.requestPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Location", "Please enable location");
                return;
            }

            const location = await ExpoLocation.getCurrentPositionAsync();

            const addresses = await ExpoLocation.reverseGeocodeAsync(location.coords);
            if (Array.isArray(addresses) && addresses.length > 0) {
                const { city, region, country } = addresses[0];
                setSelectedState(region);
                setSelectedCity(city);
                setSelectedCountry(country);
            }
        }
        loadPosition();

    }, []);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground
                    style={styles.container}
                    source={require('../../../assets/home-background.png')}
                    imageStyle={{ width: 274, height: 368 }} >

                    <View style={styles.main}>
                        <Image source={require('../../../assets/logo.png')} />
                        <View>
                            <Text style={styles.title}>Your waste collection marketplace.</Text>
                            <Text style={styles.description}>Find collection points efficiently.</Text>
                        </View>
                    </View>

                    <View style={styles.footer}>

                        <TextInput
                            style={styles.input}
                            placeholder="Country"
                            value={selectedCountry}
                            onChangeText={setSelectedCountry}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="State"
                            value={selectedState}
                            onChangeText={setSelectedState}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="City"
                            value={selectedCity}
                            onChangeText={setSelectedCity}
                        />

                        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                            <View style={styles.buttonIcon}>
                                <Text>
                                    <Icon name="arrow-right" color="#FFF" size={24} />
                                </Text>
                            </View>
                            <Text style={styles.buttonText}>
                                Join
                        </Text>
                        </RectButton>
                    </View>

                </ImageBackground>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32
    },

    main: {
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        color: '#322153',
        fontSize: 32,
        fontFamily: 'Ubuntu_700Bold',
        maxWidth: 260,
        marginTop: 64,
    },

    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 16,
        fontFamily: 'Roboto_400Regular',
        maxWidth: 260,
        lineHeight: 24,
    },

    footer: {},

    select: {},

    input: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },

    button: {
        backgroundColor: '#34CB79',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 20,
    }
});

export default Home;