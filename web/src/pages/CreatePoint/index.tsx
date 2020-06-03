import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';

import './styles.css';
import logo from '../../assets/logo.svg';


const CreatePoint = () => {
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
                        <li>
                            <img src="http://localhost:3333/uploads/oil.svg" alt="Test" />
                            <span>Cooking Oil</span>
                        </li>
                        <li className="selected">
                            <img src="http://localhost:3333/uploads/oil.svg" alt="Test" />
                            <span>Cooking Oil</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/oil.svg" alt="Test" />
                            <span>Cooking Oil</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/oil.svg" alt="Test" />
                            <span>Cooking Oil</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/oil.svg" alt="Test" />
                            <span>Cooking Oil</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/oil.svg" alt="Test" />
                            <span>Cooking Oil</span>
                        </li>
                    </ul>
                </fieldset>

                <button type="submit">Save collection point</button>
            </form>
        </div>
    );
}

export default CreatePoint;