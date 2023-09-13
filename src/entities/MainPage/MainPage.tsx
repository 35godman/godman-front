import React from 'react';
import s from './MainPage.module.css';
import MainPageHeader from '@/entities/MainPage/Header/MainPageHeader';
import { BtnUniv } from '../UI/Buttons';
import { InputAskAI } from '../UI/InputAskAI';
import { CardFeatures } from '../UI/CardFeatures';
import { CardCases } from '../UI/CardCases';
import { CardPricing } from '../UI/CardPricing';
import { Header } from '../UI/Header';
import cn from 'classnames';
const MainPage = () => {
  const cardsFutures = [
    {
      heading: 'Fast Learning',
      text:
        'Our AI chatbot adapts quickly, understanding and selling your products like a seasoned pro.',
    },
    {
      heading: 'Expert Salesmanship',
      text:
        'Charming customers like no other, Godman chatbot increases sales effortlessly',
    },
    {
      heading: '24/7 Availability',
      text:
        'Got night owls or early birds? Our AI chatbot is there for your customers around the clock.',
    },
    {
      heading: 'Customisable',
      text:
        'Tailor the Godman’s features and design to match your business needs.',
    },
    {
      heading: 'Smart Integration',
      text:
        'Godman’s chatbot seamlessly integrates with your existing systems.',
    },
    {
      heading: 'Security',
      text:
        'Your data is safe with us. We maintain top-level security to protect your information.',
    },
  ];
  const cardsCases = [
    {
      name: '-Domenico Birlandaio',
      text:
        'The first steps with Godman.AI were simple and pleasant. I use the free version and I see that even in this mode it gives me a lot of opportunities.',
    },
    {
      name: '-Marina Koltseva',
      text:
        "It's a miracle! I am delighted with his ability to work with documents and analyze information. He saved me so much time and made the workflow more productive, which is just happiness!",
    },
    {
      name: '-Avishai Altmann',
      text:
        'This application impresses with its speed and efficiency. The answers come instantly, and it significantly speeds up my workflow. I am pleased with the choice and recommend it to anyone who appreciates speed and accuracy in their workflow.',
    },
    {
      name: '-Osher Sandler',
      text:
        'My startup has clearly become more technologically advanced as soon as I connected Godman',
    },
    {
      name: '-David Roseman',
      text:
        'Goodman.AI is a real inspiration. It surprises with its innovation and ease of use. With him, my work has become easier, more efficient and much faster. My best assistant at work 👍🏾',
    },
    {
      name: '-Pablo Gutierrez',
      text:
        'This app is a real genius. It answers questions so naturally that sometimes you forget that you are communicating with artificial intelligence 😄',
    },
  ];
  const cardsPricing = [
    {
      cardName: 'Basic',
      text: 'Personal package for individuals & small businesses',
      benefits: [
        'Basic Support',
        '500 Messages',
        'Sales Insights',
        '1 Chatbot',
      ],
      price: 0,
      logo: 'basic',
    },
    {
      cardName: 'Pro',
      text: 'For mid-size businesses, agencies & growing startups.',
      benefits: [
        'Priority Support',
        'Unlimited Conversations',
        'Advanced Analytics',
        '3 Chatbots',
      ],
      price: 9.99,
      logo: 'pro',
    },
    {
      cardName: 'Enterprise',
      text:
        'For large businesses looking for a custom plan & priority support.',
      benefits: [
        'Dedicated Manager',
        'Custom Integrations',
        'Scalable Solution',
        '40 Chatbots',
      ],
      price: 99.9,
      logo: 'enterprise',
    },
  ];
  return (
    <div className={s.generalWrapper}>
      <main className={s.mainPage}>
        {/* <MainPageHeader /> */}
        <Header />
      </main>
      <section className={s.experience}>
        <div className={s.centralWrapper}>
          <h1 className={s.h1}>
            Revolutionizing the Sales Experience with{' '}
            <span className={s.gradientText}>Adaptive AI</span>
          </h1>
          <p className={cn(s.subtitleH1, s.godmansText)}>
            Godman's adaptive AI technology can transform any business,
            providing personalized, lightning-fast customer interactions that
            will keep you ahead of the game
          </p>
          <InputAskAI />
          <div className={s.benefitsWrapper}>
            <div className={s.benefit}>
              <p className={s.benifitText}>unclaiming the human factor</p>
              <h3 className={s.benifitSubtitle}>300% sales growth</h3>
            </div>
            <div className={s.benefit}>
              <p className={s.benifitText}>Quick Integration</p>
              <h3 className={s.benifitSubtitle}>in minutes</h3>
            </div>
            <div className={s.benefit}>
              <p className={s.benifitText}>customer satisfaction rate</p>
              <h3 className={s.benifitSubtitle}>95% happy users</h3>
            </div>
          </div>
          {/* <BtnUniv
            width={284}
            height={43}
            type={'regular'}
            text={'Sign Up Free'}
          ></BtnUniv>
          <BtnUniv
            width={284}
            height={43}
            type={'primary'}
            text={'Sign Up Free'}
          ></BtnUniv>
          <CardFeatures
            heading="Fast Learning"
            text="Our AI chatbot adapts quickly, understanding and selling your products like a seasoned pro."
          />
          <CardCases
            name="-Marina Koltseva"
            text="It's a miracle! I am delighted with his ability to work with documents and analyze information. He saved me so much time and made the workflow more productive, which is just happiness!"
          />
          <CardPricing
            cardName="Basic"
            text="Personal package for individuals & small businesses"
            benefits={[
              'Basic Support',
              '500 Messages',
              'Sales Insights',
              '1 Chatbot',
            ]}
            price={0}
            logo="basic"
          /> */}
        </div>
      </section>

      {/* Feautures */}
      <section className={s.section}>
        <h2 className={s.h2}>
          Rise with AI-
          <br />
          powered Sales
        </h2>
        <p className={cn(s.subtitleH1, s.textAfter)}>
          Welcome to the world of Godman.AI — the powerful chatbot constructor
          for businesses that wants to make learning and selling customer
          products a breeze. Unleash the power of AI to take your business to
          new heights!
        </p>
        <div className={s.futuresCards}>
          {cardsFutures.map(item => {
            return (
              <CardFeatures
                text={item.text}
                key={item.heading}
                heading={item.heading}
              />
            );
          })}
        </div>
      </section>

      {/* Cases */}
      <section className={s.section}>
        <h2 className={s.h2}>Loved by Our Users</h2>
        <p className={cn(s.subtitleH1, s.textAfter)}>
          Godman’s AI chatbot is built to grow and adapt as your business
          evolves, constantly improving sales tactics, and enhancing customer
          relationships!
        </p>
        <div className={s.casesCards}>
          {cardsCases.map(item => {
            return (
              <CardCases key={item.name} name={item.name} text={item.text} />
            );
          })}
        </div>
      </section>

      {/* Pricing */}
      <section className={s.section}>
        <h2 className={s.h2}>Discover Our Pricing Plans</h2>
        <div className={s.pricingCards}>
          {cardsPricing.map(item => {
            return (
              <CardPricing
                key={item.cardName}
                cardName={item.cardName}
                text={item.text}
                benefits={item.benefits}
                price={item.price}
                logo={item.logo}
              />
            );
          })}
        </div>
      </section>

      {/* Help */}
      <section className={s.section}>
        <h2 className={s.h2}>Frequently Asked Questions</h2>
      </section>
    </div>
  );
};

export default MainPage;
