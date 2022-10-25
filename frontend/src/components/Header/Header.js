import React, { useContext } from 'react'
import logo from '../../images/logo.jpg';
import './Header.css'
import { Link } from 'react-router-dom';
import { Store } from '../../store';
import { LinkContainer } from 'react-router-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
  const {state, dispatch: ctxDispatch} = useContext(Store);
  const {userInfo} = state;

  const signoutHandler = () => {
    ctxDispatch({type: 'USER_SIGNOUT'});
    localStorage.removeItem('userInfo')
    window.location.href = '/signin';
  }
  return (
    <div className='max-width header'>
        <Link to="/">
        <img src='https://res.cloudinary.com/dabcooro5/image/upload/v1666693842/logo_jvsbge.jpg' className='header-logo'></img>
        </Link>
        
        {userInfo ? (
          <div className='header-right'>
          <div className='profile-wrapper'>
          <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
            <LinkContainer to='/profile'>
              <NavDropdown.Item>User Profile</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <Link className='dropdown-item' to="#signout" onClick={signoutHandler}>Sign Out</Link>
          </NavDropdown>
          </div>
      </div>
        ) : (<div className='header-right'>
            <div className='profile-wrapper'>
                <Link to="/signin" style={{ textDecoration: 'none' }}>Sign In</Link>
            </div>
        </div>)}
        {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
        
    </div>
  )
}

export default Header