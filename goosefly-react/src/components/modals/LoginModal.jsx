import React, { Component } from "react";
import { Row, Input, Button, Tabs, Tab } from 'react-materialize';
import { Link } from 'react-router-dom';

import styles from './styles.css';
import CSSModules from 'react-css-modules';

import { connect } from 'react-redux';

class LoginModal extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { onLogin } = this.props;

    return (
      <div className="login">
        <a href="#!" className="modal-close waves-effect waves-green btn-flat">&times;</a>

        <Tabs className='tabs tab-demo'>
          <Tab className='tab' title="Вход" active>
            <form onSubmit={(e)=>{onLogin(); e.preventDefault();}}>
              <div className="input-field col s12">
                <input type="text" className="validate"/>
                <label >Имя пользователя или логин</label>
              </div>
              <div className="input-field col s12">
                <input type="password" className="validate"/>
                <label >Пароль</label>
              </div>

              <Link to="/">Забыли пароль?</Link>

              <div className="input-field col s12">
                <button type="submit">Войти</button>
              </div>
            </form>
          </Tab>
          <Tab className='tab' title="Регистрация" >
            <form>
              <Row>
                <Input label="Имя пользователя или логин" type="text" />
              </Row>
              <Row>
                <Input label="Пароль" type="text" />
              </Row>
              <Row>
                <Input type='checkbox' label='Я согласен с условиями' />
              </Row>

              <Row>
                <Button type="submit" >Зарегистрироваться</Button>
              </Row>
            </form>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const putStateToProps = (state) => {
  return {
    isAutorized: state.isAutorized,
  };
}

const putActionsToProps = (dispatch) => {
  return {
    onLogin: () => dispatch({ type: 'API_REQUEST_LOGIN' }),
  }
}

export default connect(putStateToProps, putActionsToProps)(CSSModules(LoginModal, styles));