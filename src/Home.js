import React from 'react';
import './Home.css';
import Product from './Product';

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
        />

        <div className="home__row">
          <Product
            id="49538096"
            title="The Lean Startup"
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"
            price={29.99}
            rating={5}
          />
          <Product
            id="49538094"
            title="Kenwood Mixer"
            image="https://images-na.ssl-images-amazon.com/images/I/61r0Y3Tlq9L._AC_SL1500_.jpg"
            price={239.0}
            rating={4}
          />
        </div>

        <div className="home__row">
          <Product
            id="39538094"
            title="Samsung Curved Monitor"
            image="https://images-na.ssl-images-amazon.com/images/I/81SlgyJnFEL._AC_SL1500_.jpg"
            price={199.99}
            rating={3}
          />
          <Product
            id="45538094"
            title="Amazon Echo"
            image="https://images-na.ssl-images-amazon.com/images/I/6128QtaL0LL._AC_SL1000_.jpg"
            price={99.99}
            rating={4}
          />
          <Product
            id="69538094"
            title="Ipad Pro"
            image="https://images-na.ssl-images-amazon.com/images/I/81p1L85KinL._AC_SL1500_.jpg"
            price={598.99}
            rating={5}
          />
        </div>

        <div className="home__row">
          <Product
            id="69738094"
            title="Fitbit versa 3"
            image="https://images-na.ssl-images-amazon.com/images/I/71xgLmpVOUL._AC_SL1500_.jpg"
            price={198.99}
            rating={5}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
