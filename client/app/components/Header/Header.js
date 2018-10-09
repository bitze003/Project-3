import React from 'react';
import OpenSecretsAPI from '../OpenSecrets/OpenSecretsAPI';

import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <Link to="/">Home</Link>
  <OpenSecretsAPI />
    <nav>
      <Link to="/helloworld">Hello World</Link>
    </nav>

    <hr />
  </header>
);

export default Header;
