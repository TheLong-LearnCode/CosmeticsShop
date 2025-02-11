import React, { useState } from "react";
import './ProductCard.css';
import { Card, Typography, Rate, Row, Col, Image, List, Button } from "antd";

const { Title, Text } = Typography;

export default function ProductCard({ product }) {
  const [showReviews, setShowReviews] = useState(false);

  return (
    <Card className="max-w-3xl mx-auto p-4 shadow-md product-card" bordered>
      <Row gutter={16}>
        <Col xs={24} md={8} className="flex justify-center">
          <Image
            src={product?.images[0]}
            alt={product?.title}
            width={'100%'}
            height={400}
            objectFit="cover"
          />
        </Col>
        <Col xs={24} md={16}>
          <Title level={4} className="blue-text">{product?.title}</Title>
          <Rate allowHalf defaultValue={product?.rating} className="text-yellow-500" disabled />
          <Row><Text strong className="block mt-2 product-price">${product?.price}</Text></Row>
          <Text className="block text-gray-600 mt-1">{product?.description}</Text>
          <Row gutter={8} className="mt-4 text-sm text-gray-700">
            <Col span={12}><Text strong className="blue-text">Discount:</Text> {product?.discountPercentage} %</Col>
            <Col span={12}><Text strong className="blue-text">Stock:</Text> {product?.stock}</Col>
            <Col span={12}><Text strong className="blue-text">Tags:</Text> {product?.tags.join(', ')}</Col>
            <Col span={12}><Text strong className="blue-text">Category:</Text> {product?.category}</Col>
            <Col span={12}><Text strong className="blue-text">Brand:</Text> {product?.brand}</Col>
            <Col span={12}><Text strong className="blue-text">Sku:</Text> {product?.sku}</Col>
            <Col span={12}><Text strong className="blue-text">Weight:</Text> {product?.weight}</Col>
            <Col span={12}><Text strong className="blue-text">Dimensions:</Text> {product?.dimensions.width} × {product?.dimensions.height} × {product?.dimensions.depth}</Col>
            <Col span={12}><Text strong className="blue-text">Warranty:</Text> {product?.warrantyInformation}</Col>
            <Col span={12}><Text strong className="blue-text">Delivery:</Text> {product?.shippingInformation}</Col>
            <Col span={12}><Text strong className="blue-text">Return policy:</Text> {product?.returnPolicy}</Col>
            <Col span={12}><Text strong className="blue-text">Minimum Order Quantity:</Text> {product?.minimumOrderQuantity}</Col>
            <Col span={12}><Text strong className="blue-text">BarCode:</Text> {product?.meta.barcode}</Col>
            <Col span={12}><Text strong className="blue-text">Create at:</Text> {new Date(product?.meta.createdAt).toLocaleDateString()}</Col>
            <Col span={12}><Text strong className="blue-text">Last update:</Text> {new Date(product?.meta.updatedAt).toLocaleDateString()}</Col>
            <Col span={12} className={product?.availabilityStatus === 'Low Stock' ? 'red-text' : 'green-text'}><Text strong className='blue-text'>Status:</Text> {product?.availabilityStatus}</Col>
          </Row>
          <Row justify="end" className="mt-4">
            <Col>
              <Image
                src={product?.meta.qrCode}
                alt={product?.meta.barcode}
                width={100}
                height={100}
                objectFit="cover"
              />
            </Col>
          </Row>
          <Row justify="start" className="mt-4">
            <Button className="showReview" onClick={() => setShowReviews(!showReviews)}>
              {showReviews ? "Hide Reviews" : "Show Reviews"}
            </Button>
          </Row>
        </Col>
      </Row>
      {showReviews && (
        <Row className="mt-4">
          <Col span={24}>
            <Title level={4} className="blue-text">Reviews</Title>
            <List
              itemLayout="vertical"
              dataSource={product?.reviews}
              renderItem={review => (
                <List.Item>
                  <List.Item.Meta
                    title={<Text strong>{review.reviewerName}</Text>}
                    description={<Text type="secondary">{new Date(review.date).toLocaleDateString()}</Text>}
                  />
                  <Row><Rate allowHalf defaultValue={review.rating} disabled /></Row>
                  <Text className="block mt-1">{review.comment}</Text>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      )}
    </Card>
  );
}
