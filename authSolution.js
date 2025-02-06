```javascript
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

// Debounce function to limit the rate of listener execution
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

const handleAuthStateChange = debounce((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/auth/web/manage-users
    const uid = user.uid;
    // ...
    console.log('User signed in:', uid);
  } else {
    // User is signed out
    // ...
    console.log('User signed out');
  }
});

onAuthStateChanged(auth, (user) => {
  try {
    handleAuthStateChange(user);
  } catch (error) {
    console.error('Error in onAuthStateChanged:', error);
  }
});
```