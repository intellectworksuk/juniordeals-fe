const prod = {
    url: {
      API_URL: 
        "https://api.juniordeals.co.uk/api",
    },
    firebase: {
      apiKey: "AIzaSyDjOYCMr1cqLXegQH_QzfvarpCWjKUEFnc",
      authDomain: "juniordeals.firebaseapp.com",
      databaseURL: "https://juniordeals-default-rtdb.firebaseio.com",
      projectId: "juniordeals",
      storageBucket: "juniordeals.appspot.com",
      messagingSenderId: "91414379555",
      appId: "1:91414379555:web:f27a2c853d3a7ed4ee0596",
    },
    google_maps_key: "AIzaSyDjOYCMr1cqLXegQH_QzfvarpCWjKUEFnc"
  }; 

const dev = {
    url: {
      API_URL: "http://localhost:5000/api",
    },
    firebase: {
      apiKey: "AIzaSyDFopDwsM3ZPnHURFSbIzgllo8PV2VhSPQ",
      authDomain: "chat-ware-f8777.firebaseapp.com",
      databaseURL: "https://chat-ware-f8777-default-rtdb.firebaseio.com",
      projectId: "chat-ware-f8777",
      storageBucket: "chat-ware-f8777.appspot.com",
      messagingSenderId: "971585314307",
      appId: "1:971585314307:web:9c47711adabead057a3836",
    },
    google_maps_key: "AIzaSyBAwlXYDbl6eeVRb0dlDyQo8Pv7ud6rJrY"
  };

export const config = process.env.NODE_ENV === "development" ? dev : prod;
