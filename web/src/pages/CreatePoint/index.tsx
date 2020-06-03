import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import api from '../../services/api';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';

import './styles.css';
import logo from '../../assets/logo.svg';

interface Item {
    id: number;
    title: string;
    image_url: string
}

interface IBGEUFResponse {
    id: number;
    nome: string;
}

interface IBGECityResponse {
    id: number;
    nome: string;
}

interface State {
    id: number;
    name: string,
}
interface City {
    id: number;
    name: string,
}

const CreatePoint = () => {

    const [items, setItems] = useState<Item[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);

    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

    const [selectedState, setSelectedState] = useState<State>({ id: 0, name: '' });
    const [selectedCity, setSelectedCity] = useState<City>({ id: 0, name: '' });
    const [selectedMapPosition, setSelectedMapPosition] = useState<[number, number]>([0, 0]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    })

    const history = useHistory();


    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const statesNames = response.data.map(state => {
                return {
                    id: state.id,
                    name: state.nome
                }
            });
            setStates(statesNames);
        });
    }, []);

    useEffect(() => {
        if (selectedState.id === 0) return;

        axios
            .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState.id}/municipios`)
            .then(response => {
                const cityNames = response.data.map(state => {
                    return {
                        id: state.id,
                        name: state.nome
                    }
                });
                setCities(cityNames);
            });
    }, [selectedState]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            const { latitude, longitude } = pos.coords;
            setInitialPosition([latitude, longitude]);
        })

    }, []);


    function handleSelectState(event: React.ChangeEvent<HTMLSelectElement>) {
        const state = {
            id: Number(event.target.value),
            name: event.target.options[event.target.selectedIndex].text,
        }
        setSelectedState(state);
    }

    function handleSelectCity(event: React.ChangeEvent<HTMLSelectElement>) {
        const city = {
            id: Number(event.target.value),
            name: event.target.options[event.target.selectedIndex].text,
        }
        setSelectedCity(city);
    }

    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedMapPosition([
            event.latlng.lat,
            event.latlng.lng
        ]);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if (alreadySelected > -1) {
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { name, email, whatsapp } = formData;
        const state = selectedState.name;
        const city = selectedCity.name;
        const [latitude, longitude] = selectedMapPosition;
        const items = selectedItems;

        const data = {
            name,
            email,
            whatsapp,
            state,
            city,
            latitude,
            longitude,
            items
        };

        await api.post('points', data);

        history.push('/');
    }


    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecollect" />
                <Link to="/">
                    <FiArrowLeft />
                    Back to home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1> Create collection point </h1>

                <fieldset>
                    <legend>
                        <h2>Data</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" onChange={handleInputChange} />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" name="email" id="email" onChange={handleInputChange} />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange} />
                        </div>
                    </div>

                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Address</h2>
                        <span>Select address on the map</span>
                    </legend>

                    <Map center={initialPosition} zoom={13} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedMapPosition} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="state">State</label>
                            <select value={selectedState.id} onChange={handleSelectState} name="state" id="state">
                                <option value="0">Select state</option>
                                {states.map(state => (
                                    <option key={state.id} value={state.id}>{state.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">City</label>
                            <select value={selectedCity.id} onChange={handleSelectCity} name="city" id="city">
                                <option value="0">Select City</option>
                                {cities.map(city => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Waste collection items</h2>
                        <span>Select one or more items below</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(item => (
                            <li key={item.id}
                                onClick={() => handleSelectItem(item.id)}
                                className={selectedItems.includes(item.id) ? 'selected' : ''}
                            >
                                <img src={item.image_url} alt={item.title} />
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <button type="submit">Save collection point</button>
            </form>
        </div>
    );
}

export default CreatePoint;