import React from "react";
import { Card, Col, Button, Row, ButtonGroup } from "react-bootstrap";

function Item(props) {
  return (
    <Card className="my-2">
      <Card.Body>
        <Row>
          <Col>
            <Card.Title>{props.item.title}</Card.Title>
            <Card.Text>{props.item.description}</Card.Text>
          </Col>
          <Col className="d-flex justify-content-end">
            <ButtonGroup>
              <Button
                variant={
                  props.item.completed ? "outline-secondary" : "outline-primary"
                }
                onClick={() => props.handleUpdate(props.item.id)}
              >
                {props.item.completed ? "Mark Incomplete" : "Mark Complete"}
              </Button>
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
