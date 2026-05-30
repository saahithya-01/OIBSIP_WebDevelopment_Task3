exports.registerUser = async (req, res) => {

  try {

    res.json({
      message: "User Registered"
    });

  } catch (err) {

    res.status(500).json({
      message: "Server Error"
    });
  }
};
exports.loginUser = async (req, res) => {

  try {

    res.json({
      message: "Login Successful"
    });

  } catch (err) {

    res.status(500).json({
      message: "Server Error"
    });

  }
};