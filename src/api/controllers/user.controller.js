const { User } = require('../models');
const { sendErr } = require('../../utils');

/*  ======================
 *  -- USER CONTROLLERS --
 *  ======================
 */

// -| User main controllers |-

const addUser = async (req, res, next) => {
  try {
    //const questionData = req.body;
    const userData = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        fullName:req.body.fullName,
        email:req.body.email,
        password:req.body.password
    });

    const user = await User.create(userData);

    return res.status(200).json({
      message: 'New User Added!',
      user
    });
  } catch (err) {
    return sendErr(res, err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users =  await User.find()
    .sort('-created_date')
    .lean();

    return res.status(200).json({
      message: 'All Users found!',
      users
      
    });
  } catch (err) {
    return sendErr(res, err);
  }
};

const getUser = async(req, res, next) =>{
  try {
    const { params:{userId} } = req;

    const user = await User.findOne({
      _id: userId
    })
      .select('_id firstName lastName profilePic email bio role phoneNumber mobileNumber');

    // User not found
    if (!user) {
      return sendErr(res, err, 'Error! User not found, invalid id or unauthorized request', 404);
    }

    return res.status(200).json({
      message: `User found!`,
      user
    });

  } catch (err) {
    return sendErr(res, err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const userData = req.body;

    delete req.body.userId

    const user = await User.findOneAndUpdate({
      _id: userId
    }, {
      $set: userData
    }, {
      new: true
    });

    return res.status(200).json({
      message: 'User updated!',
      user
    });

  } catch (err) {
    return sendErr(res, err);
  }
};

/*  =============
 *  -- EXPORTS --
 *  =============
 */

module.exports = {
  // User Main controllers
  addUser,
  getAllUsers,
  getUser,
  updateUser
};
