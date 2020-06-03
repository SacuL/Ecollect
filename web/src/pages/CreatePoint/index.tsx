import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import api from '../../services/api';
import axios from 'axios';

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

interface State {
    id: number;
    name: string,
}

const CreatePoint = () => {

    const [items, setItems] = useState<Item[]>([]);
    const [states, setStates] = useState<State[]>([]);

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

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecollect" />
                <Link to="/">
                    <FiArrowLeft />
                    Back to home
                </Link>
            </header>

            <form>
                <h1> Create collection point </h1>

                <fieldset>
                    <legend>
                        <h2>Data</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" name="email" id="email" />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input type="text" name="whatsapp" id="whatsapp" />
                        </div>
                    </div>

                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Address</h2>
                        <span>Select address on the map</span>
                    </legend>

                    <Map center={[-14.5800356, -48.7317126]} zoom={4.25}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-21.760955, -43.349889]} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="state">State</label>
                            <select name="state" id="state">
                                <option value="0">Select state</option>
                                {states.map(state => (
                                    <option key={state.id} value={state.name}>{state.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">City</label>
                            <select name="city" id="city">
                                <option value="0">Select City</option>
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
                            <li key={item.id}>
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