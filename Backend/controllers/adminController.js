import jwt from 'jsonwebtoken'

//Route for admin login
const adminLogin = async (req, res) => {
  try {
    const {email, password} = req.body

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email+password, process.env.JWT_SECRET);
      res.json({success: true, token})
    }else{
      res.json({success: false, message: 'Invalid Credentials'})
    }

  } catch (error) {
    res.json({success: false, message: error.message})
  }
}

export {adminLogin}