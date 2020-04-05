const { AuthenticationError } = require('apollo-server')
const Poem = require('./models/Poem')
const User = require('./models/User')
const Section = require('./models/Section')
const ObjectId = require('mongoose').Types.ObjectId
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const sendPoemToGoogleDrive = require('./utils/googleAuth')

require('dotenv').config()

const APP_SECRET = process.env.APP_SECRET

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError('You must be logged in')
  }

  return next(root, args, ctx, info)
}

module.exports = {
  Query: {
    me: authenticated((root, args, ctx) => ctx.currentUser),

    getPoems: authenticated(async (root, args, ctx) => {
      const poems = await Poem.find({ author: ctx.currentUser._id }).populate('sections').populate('author')

      return poems
    }),

    async getPoem (root, { _id }) {
      const poem = await Poem.findOne({
        _id
      }).populate('sections')
        .populate('author')

      return poem
    },

    async getSections (root, { poemId }) {
      const sections = await Section.find({
        poem: poemId
      })

      return sections
    },

    async getFeed (root, args, ctx) {
      const query = {
        published: true
      }
      if (ctx.currentUser) query.author = { $ne: ctx.currentUser._id }

      return Poem
        .find(query)
        .limit(10)
        .populate('author')
    },

    getFavorites: authenticated(async (root, input, ctx) => {
      return Poem.find({ likes: ctx.currentUser._id }).populate('author')
    })

    // uploadToDrive: authenticated(async (root, { _id, title, payload }, ctx) => {
    //   const poem = await Poem.findOne({
    //     _id
    //   })

    //   await sendPoemToGoogleDrive(title, payload)
    //   return poem
    // })
  },

  Mutation: {
    async login (root, args) {
      const user = await User.findOne({ email: args.email }).exec()

      if (!user) {
        throw new AuthenticationError('No such user found')
      }

      const valid = await bcrypt.compare(args.password, user.password)

      if (!valid) {
        throw new AuthenticationError('Invalid password')
      }

      const token = jwt.sign({ userId: user.id }, APP_SECRET)

      return {
        token,
        user
      }
    },

    async signup (root, args) {
      const userExists = await User.findOne({ email: args.email }).exec()
      if (userExists) {
        // throw error here?
        return {
          token: '',
          user: null
        }
      }

      const password = await bcrypt.hash(args.password, 8)
      const user = await new User({ ...args, password }).save()
      const token = jwt.sign({ userId: user.id }, APP_SECRET)

      return {
        token,
        user
      }
    },

    updateUser: authenticated(async (root, input, ctx) => {
      const user = await User.findOneAndUpdate(
        { _id: ctx.currentUser._id },
        input,
        { new: true }
      )

      return user
    }),

    createPoem: authenticated(async (root, { title }, ctx) => {
      const newPoem = new Poem({
        title,
        author: ctx.currentUser._id
      })
      newPoem.url = `/${ctx.currentUser.name.replace(/ /g, '')}/${newPoem._id}`

      return newPoem.save()
    }),

    updatePoem: authenticated(async (root, { _id, input }, ctx) => {
      const poem = await Poem.findOneAndUpdate(
        { _id, author: ctx.currentUser._id },
        input,
        { new: true }
      ).populate('sections')

      return poem
    }),

    deletePoem: authenticated(async (root, { _id }, ctx) => {
      const poem = await Poem.findOneAndDelete({
        _id,
        author: ObjectId(ctx.currentUser._id)
      })
      if (!poem) {
        throw new AuthenticationError(
          'You are not authorized to delete this poem'
        )
      }

      await Section.deleteMany({
        poem: _id
      })

      return poem
    }),

    createSection: authenticated(async (root, { poemId, input }) => {
      const section = await new Section({
        ...input,
        poem: poemId
      }).save()

      await Poem.findOneAndUpdate(
        {
          _id: poemId
        },
        { $addToSet: { sections: section._id } },
        { new: true }
      )

      return section
    }),

    updateSection: authenticated(async (root, { _id, input }, ctx) => {
      return Section.findOneAndUpdate({ _id }, input, { new: true })
    }),

    deleteSection: authenticated(async (root, { _id, poemId }) => {
      const section = await Section.findByIdAndRemove(_id)
      await Poem.findOneAndUpdate(
        { _id: poemId },
        { $pull: { sections: _id } }
      )
      return section
    }),

    toggleLike: authenticated(async (root, { poemId }, ctx) => {
      const userId = ctx.currentUser._id
      const poem = await Poem.findOne({ _id: poemId })

      poem.likes.includes(userId) ? poem.likes.pull(userId) : poem.likes.push(userId)
      await poem.save()

      return poem
    })
  }
}
