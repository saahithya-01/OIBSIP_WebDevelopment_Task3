const userSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    unique: true
  },

  password: String,

  role: {
    type: String,
    default: 'user'
  },

  verified: {
    type: Boolean,
    default: false
  },

  verificationToken: String,

  resetToken: String,
  resetTokenExpiry: Date

}, {
  timestamps: true
});