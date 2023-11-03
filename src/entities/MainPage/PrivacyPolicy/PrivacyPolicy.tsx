import React from 'react';
import s from './PrivacyPolicy.module.css';
import MainPageHeader from '@/entities/UI/DesktopHeader/MainPageHeader';
import { Header } from '@/entities/UI/Header/Header';
import { PrivacyPolicyElem } from '@/entities/UI/PrivacyPolicyElem/PrivacyPolicyElem';
import { privacyPolicyData } from './PrivacyPolicyData';
import Link from 'next/link';
import cn from 'classnames';

export const PrivacyPolicy = () => {
  return (
    <div className={s.generalWrapper}>
      <main id="Home" className={s.mainPage}>
        <MainPageHeader />
        <Header />
      </main>
      <section className={s.policy}>
        <h1 className={s.h1Policy}>Privacy Policy Godman.AI</h1>
        {privacyPolicyData.map(policyElem => {
          return (
            <PrivacyPolicyElem
              heading={policyElem.heading}
              text={policyElem.text}
              key={policyElem.heading}
            />
          );
        })}
      </section>
      <section className={cn(s.section, s.footer)}>
        <div className={s.footerWrapper}>
          <div className={s.logoWrapper}>
            <div className={s.logo}>
              <img
                className={s.imgFooter}
                src={'imgGeneralPage/ellipse_pro.png'}
                alt=""
              />
              <p className={s.logoText}>Godman.AI</p>
            </div>
            <div className={s.hiddenCorp}>
              <div className={s.corpDesctop}>
                © 2023 Godman AI
                <br />
                All rights reserved
              </div>
            </div>
          </div>

          <div className={s.discoverNav}>
            <p className={s.footerSubtitle}>Discover</p>
            <Link
              // onClick={e => smoothScrollTo('Home', e)}
              className={s.footerlink}
              href={'/'}
            >
              Home
            </Link>
            <Link
              // onClick={e => smoothScrollTo('', e, featuresRef)}
              className={s.footerlink}
              href={'/'}
            >
              Features
            </Link>
            <Link
              // onClick={e => smoothScrollTo('Cases', e)}
              className={s.footerlink}
              href={'/'}
            >
              Cases
            </Link>
            <Link
              // onClick={e => smoothScrollTo('Pricing', e)}
              className={s.footerlink}
              href={'/'}
            >
              Pricing
            </Link>
            <Link
              // onClick={e => smoothScrollTo('Help', e)}
              className={s.footerlink}
              href={''}
            >
              Help
            </Link>
          </div>
          <div className={s.legalNav}>
            <p className={s.footerSubtitle}>Legal</p>
            <Link className={s.footerlink} href={'/'}>
              Privacy Policy
            </Link>
            <Link className={s.footerlink} href={'/'}>
              Terms & Conditions
            </Link>
            <Link className={s.footerlink} href={'/'}>
              Contact us
            </Link>
          </div>
          <div className={s.log}>
            <Link className={s.footerLoglink} href={'/account/register'}>
              Sign Up Free
            </Link>
            <Link className={s.footerLoglink} href={'/account/login'}>
              Log in
            </Link>
            <Link
              // onClick={e => smoothScrollTo('Get_Basic', e)}
              className={s.footerLoglink}
              href={'/'}
            >
              Get Basic
            </Link>
            <Link
              // onClick={e => smoothScrollTo('Get_Pro', e)}
              className={s.footerLoglink}
              href={''}
            >
              Get Pro
            </Link>
            <Link
              // onClick={e => smoothScrollTo('Get_Enterprise', e)}
              className={s.footerLoglink}
              href={'/'}
            >
              Get Enterprise
            </Link>
          </div>
          <div className={cn(s.corp, s.corpHidden)}>
            © 2023 Godman AI
            <br />
            All rights reserved
          </div>
        </div>
      </section>
    </div>
  );
};
