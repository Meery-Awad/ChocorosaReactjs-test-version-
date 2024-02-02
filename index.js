import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from "react-router-dom";
import { Provider } from 'react-redux';
import stor from './reducers/index';
import { createStore } from 'redux';

// SEO
import { HelmetProvider } from 'react-helmet-async';
//
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
import HomePage from './component/HomePage/HomePage';
import CategoryList from './component/categoryList/catergoryList';
import SelectItem from './component/categoryList/SelectItem/selectItem';
import Profile from './component/UserProfile/profile';
import ContactUs from './component/ContactUs/ContactUs';


const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(stor);

try {
  //statements suspected to throw exception.

  root.render(

    <React.StrictMode>
      <HelmetProvider>
       
        <Provider store={store}>

          <Router>
          <Header />
            <Routes>
              <Route exact path="/" element={<Navigate replace to={'HomePage'} />} />
              <Route exact path='/HomePage' element={<HomePage />} />
              <Route exact path='/Item' element={<SelectItem />} />
              <Route exact path='/CategoryList' element={<CategoryList />} />
              <Route exact path='/Profile' element={<Profile />} />
              <Route exact path='/ContactUs' element={<ContactUs />} />
           
              


            </Routes>
            <Footer />
          </Router>
       
        </Provider>

      </HelmetProvider>

    </React.StrictMode>
  );
}

catch (e) {
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
