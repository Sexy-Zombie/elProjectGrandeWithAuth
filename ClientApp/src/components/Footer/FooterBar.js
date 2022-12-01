import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Footer } from './Footer';

export class FooterBar extends Component {
    static displayName = FooterBar.name;

    render() {
        return (
            <div>
                <Footer />
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
