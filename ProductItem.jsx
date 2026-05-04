import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductItem = ({ product, onDelete, onEdit }) => {
  return (
    <div className="col-md-4 mb-4">
      <Card className="h-100">
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{product.category}</Card.Subtitle>
          <Card.Img src={product.image} style={{ width: 300 }} />
          <Card.Text>
            <strong>Price:₹ {product.price}</strong>
            <br />
            {product.description}
          </Card.Text>
          <div className="d-flex justify-content-between">
            <Button variant="primary" size="sm" onClick={() => onEdit && onEdit(product)}>
              Edit
            </Button>
            <Button variant="danger" size="sm" onClick={() => onDelete(product.id)}>
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductItem;
