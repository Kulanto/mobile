  // Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA9Gkt-pWdEpxiOFSmeXdbVG4Idwt3gNoc",
    authDomain: "webb-807ad.firebaseapp.com",
    databaseURL: "https://webb-807ad-default-rtdb.firebaseio.com",
    projectId: "webb-807ad",
    storageBucket: "webb-807ad.appspot.com",
    messagingSenderId: "28415617331",
    appId: "1:28415617331:web:db8c5f237f459ba1913646",
    measurementId: "G-H7W6BVM8QQ"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Function to login user
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Get a reference to the database
    const database = firebase.database();
  
    // Check if the user exists in the database
    database.ref('users').once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        const user = childSnapshot.val();
        if (user.username === username && user.password === password) {
          // Redirect to homepage with user ID as query parameter
          window.location.href = 'homepage.html?userId=' + childSnapshot.key;
          // Save user data to the session storage if needed
          sessionStorage.setItem('user', JSON.stringify(user));
        }
      });
    });
  }
  
  
  function displayBalance() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
  
    firebase.database().ref('users/' + userId).once('value', (snapshot) => {
      const user = snapshot.val();
      const balanceElement = document.getElementById('balance');
      if (balanceElement) {
        balanceElement.innerText = " " + user.balance;
      } else {
        console.error("Element with ID 'balance' not found");
      }
    });
  }
  
  // Call the function to display user balance on homepage load
  window.onload = displayBalance;
  
  const menuIcon = document.getElementById('menuIcon');
menuIcon.addEventListener('click', function() {
  // Perform logout operation here
  // For example, redirect to a logout page or clear session data
  // For simplicity, let's just redirect back to the login page
  window.location.href = 'index.html';
});