function checkAuth() {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    console.log("token", token);

    if (!token) {
      // If no token is found, reject the promise
      reject(false);
      return;
    }

    $.ajax({
      url: "http://localhost:3000/api/v1/auth/checkToken",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: function (response) {
        console.log("Protected data:", response);
        // Resolve the promise with true if the token is valid
        resolve(true);
      },
      error: function (xhr, status, error) {
        console.error("Failed to authenticate", error);
        // Reject the promise with false if the token is invalid
        reject(false);
      },
    });
  });
}

// // Example of how to use the checkAuth function
// checkAuth()
//   .then((isAuthenticated) => {
//     if (isAuthenticated) {
//       console.log("User is authenticated.");
//       // Proceed with your application logic
//     } else {
//       console.log("User is not authenticated.");
//       // Redirect to login or handle accordingly
//     }
//   })
//   .catch((isAuthenticated) => {
//     console.log("User is not authenticated.");
//     // Handle the case where the token check failed
//     // Redirect to login or take appropriate action
//   });
