import React from 'react';
import styled from 'styled-components';
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.png';
import telegram from '../../assets/telegram.png';
import whatsapp from '../../assets/whatsapp.png';
import paypal from '../../assets/Paypal.png';
import elo from '../../assets/Elo.png';
import visaClassic from '../../assets/visa-classic.png';
import masterCard from '../../assets/mastercard-full.png';

const Footer = () => (
  <FooterContainer>
    <ColumnAboutUs>
      <AboutUs>Sobre nós</AboutUs>
      <AboutLink>FAQ</AboutLink>
      <AboutLink>Trocas e devoluções</AboutLink>
      <AboutLink>Entregas</AboutLink>
    </ColumnAboutUs>
    <Column>
      <ColumnTitle>Fale conosco</ColumnTitle>
      <ButtonsRow>
        <ContactButton>
          <img src={facebook} alt="facebook" />
        </ContactButton>
        <ContactButton>
          <img src={instagram} alt="instagram" />
        </ContactButton>
        <ContactButton>
          <img src={telegram} alt="telegram" />
        </ContactButton>
        <ContactButton>
          <img src={whatsapp} alt="whatsapp" />
        </ContactButton>
      </ButtonsRow>
    </Column>
    <Column>
      <ColumnTitle>Formas de pagamento</ColumnTitle>
      <ButtonsRow>
        <PaymentButton>
          <img src={paypal} alt="paypal" />
        </PaymentButton>
        <PaymentButton>
          <img src={visaClassic} alt="paypal" />
        </PaymentButton>
        <PaymentButton>
          <img src={masterCard} alt="paypal" />
        </PaymentButton>
        <PaymentButton>
          <img src={elo} alt="paypal" />
        </PaymentButton>
      </ButtonsRow>
    </Column>
  </FooterContainer>
);

export default Footer;

const FooterContainer = styled.div`
  font-family: 'Quantico', sans-serif;
  color:white;
  width: 100%;
  height: 129px;
  background-color:#686868;
  display: flex;
  justify-content: space-around;

`;

const ColumnAboutUs = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 7px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 7px;

  @media (max-width:600){
    display: none;
  }
`;

const AboutUs = styled.button`
  font-size: 25px;
  line-height: 25px;
  font-family: 'Quantico', sans-serif;
  color:white;
  background-color:inherit;
  text-align: left;
  cursor: pointer;
`;

const AboutLink = styled.button`
  font-size: 18px;
  font-family: 'Quantico', sans-serif;
  color:white;
  background-color:inherit;
  text-align: left;
  cursor: pointer;
`;

const ColumnTitle = styled.span`
  font-size: 25px;
  margin-bottom: 10px;
`;

const ButtonsRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const ContactButton = styled.button`
  width:36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius:10px;
  cursor: pointer;
  margin-right:5px;
`;

const PaymentButton = styled.button`
  width:58px;
  height:40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius:10px;
  cursor: pointer;
  margin-right:5px;

  @media (max-width:800){
    width: 48px;
    height: 30px;
  }
`;
