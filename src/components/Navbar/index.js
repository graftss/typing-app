import React from 'react';
import { Container, Menu } from 'semantic-ui-react';

import connect from '../../state/connect';

const connections = {
  actions: ['push'],
};

const Navbar = ({
  push,
}) => (
  <Menu fixed="top">
    <Container>
      <Menu.Item fitted="vertically">
        <h2>placeholder</h2>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item onClick={() => push('/test')}>
          test
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);

export default connect(connections)(Navbar);
