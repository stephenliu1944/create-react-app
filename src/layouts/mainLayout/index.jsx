import styles from './index.module.less';
import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Footer from 'Components/footer';
import Header from 'Components/header';
import lazyload from 'Components/lazyload';

const Home = lazyload(() => import(/* webpackPrefetch: true */ 'Pages/home'));
const NotFound = lazyload(() => import(/* webpackPrefetch: true */ 'Pages/notFound'));
/**
 * @desc 页面主框架组件
 */
export default class MainLayout extends Component {

  render() {
    return (
      <div className={styles.mainLayout}>
        <Header />
        <div className={styles.main}>
          <Switch>
            <Route exact path="/home" component={Home} />
            {/* 路由加在这里 */}
            <Redirect exact from="/" to="/home" />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}