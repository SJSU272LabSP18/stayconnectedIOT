import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBYdJFkMcUeOKIykL4XUDBV59xbLgK85ew",
    authDomain: "stayconnected-538a4.firebaseapp.com",
    databaseURL: "https://stayconnected-538a4.firebaseio.com",
    projectId: "stayconnected-538a4",
    storageBucket: "stayconnected-538a4.appspot.com",
    messagingSenderId: "267605235932"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
    auth,
};