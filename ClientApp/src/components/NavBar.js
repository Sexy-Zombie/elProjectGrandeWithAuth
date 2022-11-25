import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { Footer } from './Footer';

export class NavBar extends Component {
    static displayName = NavBar.name;

  render() {
    return (
        <div>
            <NavMenu {...this.props} />
        <Container>
          {this.props.children}
            </Container>
        </div>
    );
  }
}
