import React from 'react'
import { Profiler } from 'react'
import Featured from '../../components/featured/Featured'
import Fproperties from '../../components/featuredProperties/Fproperties'
import Footer from '../../components/footer/Footer'
import Header from '../../components/Header/Header'
import MailList from '../../components/mailList/MailList'
import Navbar from '../../components/navbar/Navbar'
import Propertylist from '../../components/propertylist/Propertylist'
import './home.css'
const Home = () => {
  return (
    <div><Navbar/>
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">Browse by Property Type</h1>
        <Propertylist/>
        <h1 className="homeTitle">Home Guests love</h1>
        <Fproperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home