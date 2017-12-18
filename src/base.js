import Rebase from 're-base'
import firebase from 'firebase'

const app = firebase.initializeApp({
  apiKey: "AIzaSyDYicIksaqORu4bEFyZQdoPBwVNg_u00zc",
  authDomain: "projeto-final-pfa.firebaseapp.com",
  databaseURL: "https://projeto-final-pfa.firebaseio.com",
  projectId: "projeto-final-pfa",
  storageBucket: "",
  messagingSenderId: "881150021542"
})

const base = Rebase.createClass(app.database())

export default base
