const dbHelper = require('../utils/dbHelper');
const { generateToken } = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, phone, role } = req.body;

    if (!firstName || !lastName || !email || !password) {
      res.status(400);
      throw new Error('Please fill in all required fields (firstName, lastName, email, password)');
    }

    const userExists = await dbHelper.findUserByEmail(email);

    if (userExists) {
      res.status(400);
      throw new Error('A user with this email address already exists');
    }

    const user = await dbHelper.createUser({
      firstName,
      lastName,
      email,
      password, // Password will be hashed in the dbHelper or model layer
      phone,
      role: role || 'user'
    });

    if (user) {
      res.status(201).json({
        success: true,
        message: 'Registration successful',
        data: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          role: user.role,
          token: generateToken(user._id)
        }
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data provided');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Please enter both email and password');
    }

    const user = await dbHelper.findUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        success: true,
        message: 'Login successful',
        data: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          role: user.role,
          token: generateToken(user._id)
        }
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res, next) => {
  try {
    const user = await dbHelper.findUserById(req.user._id);

    if (user) {
      res.json({
        success: true,
        data: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          role: user.role
        }
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res, next) => {
  try {
    const user = await dbHelper.findUserById(req.user._id);

    if (user) {
      const updates = {
        firstName: req.body.firstName || user.firstName,
        lastName: req.body.lastName || user.lastName,
        phone: req.body.phone !== undefined ? req.body.phone : user.phone
      };
      
      if (req.body.avatar) {
        updates.avatar = req.body.avatar;
      }
      
      if (req.body.password) {
        updates.password = req.body.password;
      }

      const updatedUser = await dbHelper.updateUser(req.user._id, updates);

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: {
          _id: updatedUser._id,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          phone: updatedUser.phone,
          avatar: updatedUser.avatar,
          role: updatedUser.role,
          token: generateToken(updatedUser._id)
        }
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users (Admin only)
// @route   GET /api/auth/users
// @access  Private/Admin
const getAllUsers = async (req, res, next) => {
  try {
    const users = await dbHelper.findUsers({});
    res.json({
      success: true,
      count: users.length,
      data: users.map(u => ({
        _id: u._id,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        phone: u.phone,
        avatar: u.avatar,
        role: u.role,
        createdAt: u.createdAt
      }))
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user role (Admin only)
// @route   PUT /api/auth/users/:id/role
// @access  Private/Admin
const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    if (!role || !['user', 'admin'].includes(role)) {
      res.status(400);
      throw new Error('Please provide a valid role (user or admin)');
    }

    const user = await dbHelper.findUserById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    if (user._id.toString() === req.user._id.toString() && role !== 'admin') {
      res.status(400);
      throw new Error('You cannot change your own admin role');
    }

    const updatedUser = await dbHelper.updateUser(req.params.id, { role });

    res.json({
      success: true,
      message: `User role successfully updated to ${role}`,
      data: {
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        role: updatedUser.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/auth/users/:id
// @access  Private/Admin
const deleteUser = async (req, res, next) => {
  try {
    const user = await dbHelper.findUserById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    if (user._id.toString() === req.user._id.toString()) {
      res.status(400);
      throw new Error('You cannot delete your own admin account');
    }

    await dbHelper.deleteUser(req.params.id);

    res.json({
      success: true,
      message: 'User account successfully deleted'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  updateUserRole,
  deleteUser
};
