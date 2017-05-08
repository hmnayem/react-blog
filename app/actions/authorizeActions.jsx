// - Import external components
import {firebaseRef, firebaseAuth} from 'app/firebase/'
import moment from 'moment'

// - Import action types
import * as types from 'actionTypes'


// - Authorizaiton actions

// Loing user
export var login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  }

}


export var dbLogin = (email,password) => {
  return (dispatch, getState) => {
    console.log('email: ', email, 'password: ', password);
    return firebaseAuth().signInWithEmailAndPassword(email, password)
    .then((result)=> {
      console.log('Auth worked!', result)
      dispatch(login(result.uid))
    },
    (error) => {console.log(error) } )
  }
}

// Logout user
export var _logout = () =>{
  return{
    type: types.LOGOUT,
    authed: false
  }
}

export var dbLogout = () =>{
  return (dispatch,getState) => {
    return firebaseAuth().signOut().then((result)=>{
      console.log(result)
      dispatch(_logout())
    }, (error) =>{
        console.log(error)

    })
  }

}


// Register user
export var signup = (user) => {
  return{
    type: types.SIGNUP,
    ...user
  }

}

export var dbSignup = (user) => {
  return (dispatch, getState) => {

    return firebaseAuth().createUserWithEmailAndPassword(user.email,user.password)
    .then((signupResult) => {
      firebaseRef.child(`users/${signupResult.uid}/info`)
      .set({
        ...user
      }).then((result)=>{
        console.log(result)

      },(error)=>{
        console.log(error)

      })

      dispatch(signup({
        uid: signupResult.uid,
         ...user}))
    }, (error) => {console.log(error)})
  }

  }