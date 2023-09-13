import React, { useEffect, useState } from 'react';
import s from './CardPricing.module.css';
import { BtnUniv } from '../UI/Buttons';

type CardPricingProps = {
  cardName: string;
  text: string;
  benefits: Array<string>;
  price: number;
  logo: string;
};

export const CardPricing: React.FC<CardPricingProps> = ({
  cardName,
  text,
  benefits,
  price,
  logo,
}) => {
  const [src, setSrc] = useState<string>('');
  const [btnType, setType] = useState<string>('regular');
  const [btnText, setText] = useState<string>('');
  useEffect(() => {
    switch (logo) {
      case 'basic':
        setSrc('ellipse_basic.png');
        setText('Get Basic');
        break;
      case 'pro':
        setSrc('ellipse_pro.png');
        setText('Get Pro');
        break;
      case 'enterprise':
        setSrc('ellipse_enterprise.png');
        setText('Get Enterprise');
        break;
    }
  }, []);
  return (
    <div
      className={s.cardWrapper}
      onMouseEnter={() => setType('primary')}
      onMouseLeave={() => setType('regular')}
    >
      <div>
        <div className={s.header}>
          <div>
            <img className={s.img} src={src} alt="" />
          </div>
          <p className={s.name}>{cardName}</p>
        </div>
        <div className={s.text}>{text}</div>
      </div>
      <div>
        {benefits.map(benefit => {
          return (
            <div key={benefit} className={s.benefit}>
              <img className={s.imgOk} src="icon_ok.png" alt="" /> {benefit}
            </div>
          );
        })}
      </div>
      <div className={s.footerWrap}>
        <p className={s.price}>
          $ <span className={s.spanPrice}>{price}</span>
        </p>
        <BtnUniv type={btnType} text={btnText}></BtnUniv>
      </div>
    </div>
  );
};
