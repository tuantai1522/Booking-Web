const { logIn } = require("../services/loginApiService.js");

const LoginFunc = async (req, res) => {
  try {
    const data = await logIn(req.body);

    //set cookie
    if (data && data.DT.access_token) {
      res.cookie("jwt", data.DT.access_token, {
        secure: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 15, // would expire after 15 minutes
        sameSite: "none",
      });
    }

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "error",
      EC: "-1",
      DT: "",
    });
  }
};

const LogoutFunc = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      secure: true,
      httpOnly: true,
      expires: new Date(),
      sameSite: "none",
    });

    return res.status(200).json({
      EM: "Log out successfully",
      EC: 0,
      DT: "",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "error",
      EC: "-1",
      DT: "",
    });
  }
};

module.exports = {
  LoginFunc,
  LogoutFunc,
};
