import React, { Component } from 'react';

import { changeFirstName, changeSecondName, changeLang } from '../../store/actions';
import {  Input } from 'react-materialize';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Home extends Component {
  render() {
    const {firstName, secondName, changeFirstName, changeSecondName, changeLang, lang} = this.props;
    return (
      <div>
        <h2>MAIN</h2>
        <div>
          <input 
          value={firstName} 
          onChange={(event)=>{
            changeFirstName(event.target.value);
          }}
          type="text" placeholder="First Name" />
          {/* <input 
          value={firstName} 
          onChange={(event)=>{
            changeFirstName(event.target.value);
          }}
          type="text" placeholder="First Name" /> */}
        </div>
        <div>
          <input 
          value={secondName} 
          onChange={(event)=>{
            changeSecondName(event.target.value);
          }}
          type="text" placeholder="Second Name" />
        </div>
        <div>
          <input 
          value={lang} 
          onChange={(event)=>{
            changeLang(event.target.value);
          }}
          type="text" placeholder="Lang" />
        </div>
        <div>
          {`${firstName} ${secondName} ${lang}`}
        </div>
      </div>
    );
  }
}

const putStateToProps = (state) => {
  return {
    firstName: state.firstName,
    secondName: state.secondName,
    lang: state.lang,
  };
}

const putActionsToProps = (dispatch) => {
  return {
    changeFirstName: bindActionCreators(changeFirstName, dispatch),
    changeSecondName: bindActionCreators(changeSecondName, dispatch),
    changeLang: bindActionCreators(changeLang, dispatch),
  }
};


export default connect(putStateToProps, putActionsToProps)(Home);
