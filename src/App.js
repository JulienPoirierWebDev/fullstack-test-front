import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ItemsScreen from "./screens/ItemsScreen";
import HomeScreen from "./screens/HomeScreen";
import Footer from "./components/Footer";

import "./App.css"
import LoginScreen from "./screens/LoginScreen";
import UserScreen from "./screens/UserScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import EditScreen from "./screens/EditScreen";

function App() {
    return (
        <Router>
            <div className={"overflow-hidden"}>

                <Routes>
                    <Route
                        path="/"
                        element={<HomeScreen/>}
                    />

                    <Route
                        path='/histoire/:id'
                        element={<ItemsScreen/>}
                    />


                    <Route
                        path='/se-connecter/'
                        element={<LoginScreen/>}
                    />

                    <Route
                        path='/mon-profil'
                        element={<UserScreen/>}
                    />

                    <Route
                        path='/edition/'
                        element={<EditScreen/>}
                    />

                    <Route
                        path='/edition/:id_item'
                        element={<EditScreen/>}
                    />



                    <Route
                        path="*"
                        element={<NotFoundScreen/>}
                    />

                </Routes>
            </div>

            <Footer/>

        </Router>
    );
}

export default App;
