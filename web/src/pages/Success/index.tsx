import React from 'react';

import './styles.css';
import logo from '../../assets/logo.svg';
import appStoreBadge from '../../assets/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg';
import googlePlayBadge from '../../assets/google-play-badge.png';

const Success = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="Ecollect" />
                </header>
                <main>
                    <h1>
                        Point created!
                    </h1>
                    <p>
                        Now download the app:
                    </p>

                    <div className="badges">
                        <img src={appStoreBadge} alt='Download on the App Store'></img>
                        <img src={googlePlayBadge} alt='Get it on Google Play'></img>
                    </div>

                </main>
                <footer>
                    <p>Google Play and the Google Play logo are trademarks of Google LLC.</p>
                    <p>Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries.</p>
                </footer>
            </div>
        </div>
    )
}

export default Success;