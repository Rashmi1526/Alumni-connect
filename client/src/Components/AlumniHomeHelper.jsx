import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { alumniLogout, newerChats, previousChats } from '../redux/action/alumniAction';

const Alumni = () => {
  const history = useHistory();
  const store = useSelector((store) => store);
  const [name, setName] = useState('');

  useEffect(() => {
    if (store.alumni.alumni.name) {
      setName(store.alumni.alumni.name);
    }
  }, [store.alumni.alumni.name]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(newerChats(store.alumni.alumni.name));
    dispatch(previousChats(store.alumni.alumni.name));
  }, [store.alumni.newerChats.length]);

  const logoutHandler = () => {
    dispatch(alumniLogout());
    history.push('/');
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <h4 className="navbar-brand mt-1">ABES</h4>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <button type="button" className="btn">
                    <Link to="/Alumni">
                      <li>{name.toUpperCase()}</li>
                    </Link>
                  </button>
                </li>
                <li className="nav-item">
                  <button type="button" className="btn">
                    <Link to="/alumni/updateProfile">
                      <li>UPDATE PROFILE</li>
                    </Link>
                  </button>
                </li>
                

                <li className="nav-item">
                  <button type="button" className="btn">
                    <Link to="/alumni/newConversation">
                      <li>NEW CONVERSATION ({store.alumni.newerChats.length})</li>
                    </Link>
                  </button>
                </li>
                <li className="nav-item">
                  <button type="button" className="btn">
                    <Link to="/alumni/updatePassword">
                      <li>UPDATE PASSWORD</li>
                    </Link>
</button>
</li>
</ul>
</div>
<div>
<button style={{ listStyle: "none" }} onClick={logoutHandler} type="button" className="btn">
<li>LOGOUT</li>
</button>
</div>
</nav>
</div>
</div>
</div>
);
};

export default Alumni;
