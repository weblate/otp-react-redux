// import necessary React/Redux libraries
import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

// import Bootstrap Grid components for layout
import { Navbar, Grid, Row, Col } from 'react-bootstrap'

// import OTP-RR components
import {
  DefaultSearchForm,
  ErrorMessage,
  MobileMain,
  NarrativeRoutingResults,
  ResponsiveWebapp,
  Map,
  ViewerContainer,
  AppMenu,
  createOtpReducer
} from './lib'

// load the OTP configuration
import otpConfig from './config.yml'

// create an initial query for demo/testing purposes
const initialQuery = {
  from: {
    lat: 45.5246,
    lon: -122.6710
  },
  to: {
    lat: 45.5307,
    lon: -122.6647
  },
  type: 'ITINERARY'
}

// set up the Redux store
const store = createStore(
  combineReducers({
    otp: createOtpReducer(otpConfig) // add optional initial query here
    // add your own reducers if you want
  }),
  applyMiddleware(thunk, createLogger())
)

// define a simple responsive UI using Bootstrap and OTP-RR
class OtpRRExample extends Component {
  render () {

    /** desktop view **/
    const desktopView = (
      <div className='otp'>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <div style={{ float: 'left', color: 'white', fontSize: 28 }}>
                <AppMenu />
              </div>
              <div className='navbar-title' style={{ marginLeft: 50 }}>OpenTripPlanner</div>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row className='main-row'>
            <Col sm={6} md={4} className='sidebar'>
              <ViewerContainer>
                <DefaultSearchForm />
                <ErrorMessage />
                <div className='desktop-narrative-container'>
                  <NarrativeRoutingResults />
                </div>
              </ViewerContainer>
            </Col>

            <Col sm={6} md={8} className='map-container'>
              <Map />
            </Col>
          </Row>
        </Grid>
      </div>
    )

    /** mobile view **/
    const mobileView = (
      <MobileMain map={(<Map />)} title={(<div className='navbar-title'>OpenTripPlanner</div>)} />
    )

    /** the main webapp **/
    return (
      <ResponsiveWebapp
        desktopView={desktopView}
        mobileView={mobileView}
      />
    )
  }
}

// render the app
render(
  <Provider store={store}>
    { /**
     * If not using router history, simply include OtpRRExample here:
     * e.g.
     * <OtpRRExample />
     */
    }
    <OtpRRExample />

  </Provider>,
  document.getElementById('root')
)
