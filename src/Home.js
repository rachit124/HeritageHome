import React from 'react'
import './Home.css'
import Product from './Product'

function Home() {
  return (
    <div className='home'>
        <div className="home_container">
            <img className="home_image" src="https://media.esaras.in/wysiwyg/artisans_banner_1.png" alt="" />
            {/*2nd img url https://esaras.dic.org.in/media/wysiwyg/product-banner.jpg*/}
            <div className="home_row">
                <Product id="1243423" title="Wood Puzzle Panda" price={650} image="https://media.esaras.in/catalog/product/cache/e3ad65960a88b761cb757db23d9137f9/e/s/es02263-2.jpg" rating={4}/>
                <Product id="1243424" title="Wood Puzzle Bees is the best thing to get in this world as of now grab yours as soon as possible" price={620} image="https://media.esaras.in/catalog/product/cache/2198cda074b794191f1e8b4aabcefc8d/e/s/es02265-1.jpg" rating={3}/>
            </div>
            <div className="home_row">
                <Product id="1243433" title="Pen Stand + Flag + Ganesh" price={999} image="https://media.esaras.in/catalog/product/cache/2198cda074b794191f1e8b4aabcefc8d/1/_/1_6.jpeg" rating={4}/>
                <Product id="1243523" title="Wooden Storage Box" price={770} image="https://media.esaras.in/catalog/product/cache/2198cda074b794191f1e8b4aabcefc8d/2/_/2_158_1.jpg" rating={3}/>
                <Product id="1242223" title="Dhokra Art Brass Nandi" price={2920} image="https://media.esaras.in/catalog/product/cache/2198cda074b794191f1e8b4aabcefc8d/1/_/1_172_1.jpg" rating={5}/>

            </div>
            <div className="home_row">
                <Product id="2343423" title="Stone Brass Radha Krishna Idol |Handcrafted Brass Figurine | Festive Decor | Puja Essentials | Lord Krishna | Radha Rani" price={35448} image="https://media.esaras.in/catalog/product/cache/e3ad65960a88b761cb757db23d9137f9/1/s/1st_radha_krishn_idol.jpg_1.jpg" rating={5}/>
                
            </div>
        </div>
    </div>
  )
}

export default Home