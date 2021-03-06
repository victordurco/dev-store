import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '../shared/Container';
import { getCategoryProducts } from '../../services/devStore.services';
import ProductCard from '../shared/ProductCard';

const Category = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategoryProducts(categoryId)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => navigate('/*'));
  }, [categoryId]);

  return (
    <Container>
      {loading
        ? (
          <Loader
            type="Puff"
            color="#FA4098"
            height={200}
            width={200}
            timeout={3000}
          />
        )
        : (
          <ProductsContainer>
            {products.map((product) => (
              <ProductCard
                itemId={product.id}
                key={product.id}
                title={product.name}
                image={product.photo}
                price={product.price}
                code={product.code}
              />
            ))}
          </ProductsContainer>
        )}

    </Container>
  );
};

export default Category;

const ProductsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
