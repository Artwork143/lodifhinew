import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
// import findOrCreate from "mongoose-findorcreate";

const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

// const uri = `mongodb+srv://${process.env.MONGODBPASS}@cluster0.qe1zc6f.mongodb.net/userDB?ssl=true&authSource=admin`;
const uri = `mongodb://atlas-sql-650692e554ae6f2ea929b085-ngts5.a.query.mongodb.net/userDB?ssl=true&authSource=admin`;
const PORT = process.env.PORT || 3000;




app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// atlas db connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String },
});

userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// passport.serializeUser(function (user, cb) {
//   process.nextTick(function () {
//     return cb(null, {
//       id: user.id,
//       username: user.username,
//       picture: user.picture,
//     });
//   });
// });

// passport.deserializeUser(function (user, cb) {
//   process.nextTick(function () {
//     return cb(null, user);
//   });
// });

// app.post("/register", (req, res) => {
//   User.create(req.body)
//   .then(User => res.json(User))
//   .catch(err => res.json(err))
// });

app.post('/register', (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;
  User.register(
    new User({ firstName, lastName, email, username }),
    password,
    (err, user) => {
      if (err) {
        console.error('🚨 Registration error:', err); // Log the error for clarity
        return res.status(500).json({ message: err.message });
      }
      passport.authenticate('local')(req, res, () => {
        res.status(200).json({ message: '🎉 Registration successful! 🎉' });
      });
    }
  );
});

// app.post('/register', async (req, res) => {
//   const { firstName, lastName, email, username, password } = req.body;
  
//   try {
//     // Check if the email is already in use
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email is already in use' });
//     }
    
//     // Create a new user
//     const newUser = new User({ firstName, lastName, email, username });
//     await newUser.setPassword(password); // Set the password using setPassword method if using passport-local-mongoose
//     await newUser.save();
    
//     res.status(201).json({ message: 'Registration successful' });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.post('/register', async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;

//   try {
//     // Check if the email is already in use
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email is already in use' });
//     }

//     // Create a new user
//     const newUser = new User({ firstName, lastName, email });
//     await User.register(newUser, password);

//     res.status(201).json({ message: 'Registration successful' });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.authenticate()(email, password, (err, user, options) => {
    if (err) {
      res.status(500).json({ message: "Internal server error" });
    } else if (user) {
      res.json("Success");
    } else {
      res.json(options.message);
    }
  });
});

// app.get("/login", (req, res) => {
//   res.render("login");
// });

// app.get("/register", (req, res) => {
//   res.render("register");
// });

// app.get("/profile", function (req, res) {
//   if (req.isAuthenticated()) {
//     res.render("profile");
//   } else {
//     res.redirect("/login");
//   }
// });

app.post('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful' });
});

// app.get('/profile', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.json({ user: req.user });
//   } else {
//     res.status(401).json({ user: null });
//   }
// });

// Check authentication status
app.get('/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ user: null });
  }
});

// app.post("/register", (req, res) => {
//   User.register(
//     { username: req.body.email },
//     req.body.password,
//     function (err, user) {
//       if (err) {
//         res.redirect("/register");
//         console.log(err);
//         return res.status(400).json({ message: 'Registration failed' });
//       } else {
//         passport.authenticate("local")(req, res, function () {
//           res.redirect("/profile");
//           res.json({ message: 'Registration successful', user });
//         });
//       }
//     }
//   );
// });


// app.listen(3000, function() {
//     console.log(`Server started on port ${PORT}`);
// });

// Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
