import React from 'react';
import App, { AppInitialProps, AppContext } from 'next/app';
import { wrapper } from '../store/store';
import '../public/assets/styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.css'

class WrappedApp extends App<AppInitialProps> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    return {
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        appProp: ctx.pathname,
      },
    };
  };
  public render() { 
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />
  }
}

export default wrapper.withRedux(WrappedApp);