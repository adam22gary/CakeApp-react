import React, { Component } from "react";
import { Container, Grid, Header, Segment } from "semantic-ui-react";
class Footer extends Component {
  render() {
    const currentYear = new Date().getFullYear();
    return (
      <Segment inverted vertical style={{ padding: '3em 3em', backgroundColor: "#e6e6e6" }}>
        <Container>
          <Grid.Column width={7}>
            <Header style={{ color: "black" }} as='h4' inverted>
              Cake Calculator
              </Header>
            <p style={{ color: "black" }}>
              Copyright © {currentYear} Cake Calculator All Rights Reserved.
              </p>
          </Grid.Column>
        </Container>
      </Segment>
    );
  }
}
export default Footer;