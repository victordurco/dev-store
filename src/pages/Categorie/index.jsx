import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import Container from '../shared/Container';
import { getCategorieProducts } from '../../services/devStore.services';
import ProductCard from '../shared/ProductCard';

const Categorie = () => {
  const { categorieId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategorieProducts(categorieId)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo deu errado, por favor recarregue a pagina',
      }));
  }, [categorieId]);

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

export default Categorie;

const ProductsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
