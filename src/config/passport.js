const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { prisma } = require('../config/db');
const { generateToken } = require('../utils/jwt');

// Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await prisma.user.findUnique({ where: { email } });

        if (req.user) {
          await prisma.oauthAccount.upsert({
            where: { providerId: profile.id },
            update: { userId: req.user.id },
            create: {
              userId: req.user.id,
              provider: 'google',
              providerId: profile.id,
            },
          });

          return done(null, { user: req.user, token: await generateToken(req.user.id) });
        }

        if (!user) {
          user = await prisma.user.create({
            data: {
              fullname: profile.displayName,
              username: profile.id,
              email,
              password: null,
            },
          });
        }

        await prisma.oauthAccount.upsert({
          where: { providerId: profile.id },
          update: { userId: user.id },
          create: {
            userId: user.id,
            provider: 'google',
            providerId: profile.id,
          },
        });

        const token = await generateToken(user.id);
        return done(null, { user, token });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
