const isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }
  next();
};

// routes/auth.routes.js
// ... we won't make any changes, we will just add a new route
// (the order really) doesn't matter, but you can keep the logic signup => login => logout

const isLoggedOut = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/");
  }
  next();
};

module.exports = { isLoggedIn, isLoggedOut };
