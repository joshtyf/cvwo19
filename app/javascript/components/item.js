import React from "react";
import { Card, Col, Button, Row, ButtonGroup } from "react-bootstrap";

function Item(props) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col>
            <Card.Title>{props.item.title}</Card.Title>
            <Card.Text>{props.item.description}</Card.Text>
          </Col>
          <Col className="d-flex justify-content-end">
            <ButtonGroup>
              <Button variant="outline-primary">Mark Complete</Button>
              <Button
                variant="outline-danger"
                onClick={() => props.handleDelete(props.item.id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Item;
