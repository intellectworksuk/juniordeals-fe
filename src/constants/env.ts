const prod = {
  url: {
    API_URL:
      "http://juniordealsbeprod-env.eba-zyspfpx9.eu-west-2.elasticbeanstalk.com/api",
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

export const config = process.env.NODE_ENV === "development" ? prod : prod;
