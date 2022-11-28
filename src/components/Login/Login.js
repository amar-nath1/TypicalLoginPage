import React, { useState,useEffect,useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

  const emailReducer=(state,action)=>{

    if (action.type=== 'USER_INPUT')
    {

      return {value:action.val,isValid:action.val.includes('@')}
    }

    if (action.type === 'INPUT_BLUR'){

      return {value:state.value,isValid:state.value.includes('@')}

    }

    return {value:'',isValid:false}

  }


  const passwordReducer=(state,action)=>{

    if (action.type=== 'USER_INPUT')
    {

      return {value:action.val,isValid:action.val.trim().length>6}
    }

    if (action.type === 'INPUT_BLUR'){

      return {value:state.value,isValid:state.value.trim().length>6}

    }

    return {value:'',isValid:false}

  }


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollegeName, setEnteredCollegeName] = useState('');
  const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState,dispatchEmail]=useReducer(emailReducer,{value:'',isValid:null})

  const [passwordState,dispatchPassword]=useReducer(passwordReducer,{value:'',isValid:null})

  const {isValid:emailIsValid}=emailState

  const {isValid:passwordIsValid}=passwordState
  useEffect(()=>{

    setFormIsValid(
      emailIsValid && enteredCollegeName.trim().length>1 && passwordIsValid
    );

  },[emailIsValid,passwordIsValid,enteredCollegeName])
  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT',val:event.target.value});

    // setFormIsValid(
    //   emailState.isValid && enteredCollegeName.trim().length>1 && passwordState.isValid
    // );
  };

  const collegeNameChangeHandler = (event) => {
    setEnteredCollegeName(event.target.value);
    setFormIsValid(
      emailState.value.isValid && enteredCollegeName.trim().length>1 && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'USER_INPUT',val:event.target.value});
    // setFormIsValid(
    //   emailState.value.isValid && enteredCollegeName.trim().length>1 && event.target.value.trim().length > 6
    // );

  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'});
  };

  const validateCollegeNameHandler = () => {
    setCollegeIsValid(enteredCollegeName.trim().length>1);
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredCollegeName, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>


        <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="collegeName">College Name</label>
          <input
            type="text"
            id="collegename"
            value={enteredCollegeName}
            onChange={collegeNameChangeHandler}
            onBlur={validateCollegeNameHandler}
          />
        </div>

        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            placeholder='Enter atleast 7 characters of password'
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;