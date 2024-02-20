const { readSetting, updateSetting } = require("../services/settingApiService");

const ReadSettingFunc = async (req, res) => {
  try {
    const data = await readSetting();
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

const UpdateSettingFunc = async (req, res) => {
  try {
    const data = await updateSetting(req.body);
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

module.exports = {
  ReadSettingFunc,
  UpdateSettingFunc,
};
