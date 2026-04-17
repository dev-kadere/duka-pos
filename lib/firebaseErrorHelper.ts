const getFirebaseErrorMessage = (code: any) => {
  switch (code) {
    case "auth/invalid-credential":
      return "Invalid email or password";

    case "auth/user-not-found":
      return "No account found with this email";

    case "auth/wrong-password":
      return "Incorrect password";

    case "auth/email-already-in-use":
      return "Email is already in use";

    case "auth/too-many-requests":
      return "Too many attempts. Try again later";

    default:
      return "Something went wrong. Please try again";
  }
};

export default getFirebaseErrorMessage;
