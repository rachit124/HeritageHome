import React from 'react'
import './Header.css'   
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useStateValue } from './component/StateProvider'
import { auth } from './firebase';


function Header() {

    const handleAuthentication = ()=>{
        if(user){
            auth.signOut();
        }
    }

    
    const [{basket, user} ,dispatch] = useStateValue();
    const basketCount = basket.reduce((count, item) => count + item.quantity, 0);

  return (
    <div>
        <div className='header'>
            <Link to="/">
                <img className="header_logo" src="https://uploads.turbologo.com/uploads/design/preview_image/63465196/watermark_preview_image20240925-1-1mpfqqu.png" alt="" />
            </Link>
            
            <div className='header_search'>
                <input className="header_searchInput" type="text" placeholder='Type Your Text...' />
                <SearchIcon className='header_searchIcon'/>
            </div>

            <div className='header_nav'>
                <Link to={!user && '/login'} style={{ textDecoration: 'none' }}>
                <div onClick={handleAuthentication} className='header_option'>
                    <span className='header_optionLineOne'>Hello {user ? user.email: "Guest"}</span>
                    <span className='header_optionLineTwo'>{user ? 'Sign Out' : 'Sign In'}</span>
                </div>
                </Link>
                <Link to='/order' style={{ textDecoration: 'none' }}>
                <div className='header_option'>
                    <span className='header_optionLineOne'>Return</span>
                    <span className='header_optionLineTwo'>Order</span>
                </div>
                </Link>
                <div className='header_option'>
                    <span className='header_optionLineOne'>Your</span>
                    <span className='header_optionLineTwo'>Premium</span>
                </div>
            </div>
            <Link className="header_Basketlink" to="/checkout" >
                <div className='header_optionBasket'>
                    <ShoppingCartIcon className='header_' />
                    <span className='header_optionLineTwo header_basketCount'>{basketCount}</span>
                </div>
            </Link>

        </div>
    </div>
  )
}

export default Header