const Blog = require('./blog')
const User = require('./user')
const UserReadingList = require('./readingList')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

Session.belongsTo(User)

User.belongsToMany(Blog, { through: UserReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: UserReadingList, as: 'userReadings' })

module.exports = {
  Blog, 
  User, 
  UserReadingList, 
  Session
}