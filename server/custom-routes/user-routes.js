let Users = require('../models/user')
let Bounties = require('../models/bounty')

module.exports = {
  userData: {
    path: '/',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find Users'
      Users.find({ _id: req.session.uid })
        .then(user => {
          res.send(handleResponse(action, user))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  newUserBounty: {
    path: '/users/:userId/bounties',
    reqType: 'post',
    method(req, res, next) {
      let action = 'Create New Bounty'
      Bounties.create(req.body)
        .then((bounty) => {
          res.send({
            message: 'Successfully created user bounty!',
            data: bounty
          })
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    },
    userProperties: {
      path: '/users/:userId',
      reqType: 'put',
      method(req, res, next) {
        let action = 'Update User Info'
        Users.findByIdAndUpdate(req.params.userId, req.body)
          .then(user => {
            res.send(handleResponse(action, user))//send updated user info to store
          }).catch(error => {
            return next(handleResponse(action, null, error))
          })
      }
    },

    friends: {
      path: '/friends/:userId',
      reqType: 'put',
      method(req, res, next) {
        let action = 'Add/Remove Friends'
        Users.findById(req.params.userId)
          .then(user => {
            user.requests.push(req.body.Sender)
            user.save()
              .then(() => {
                res.send(handleResponse(action, user))//send updated user info to store
              }).catch(error => {
                return next(handleResponse(action, null, error))
              })
          }).catch(error => {
            return next(handleResponse(action, null, error))
          })
      }
    },

    searchUsers: {
      path: '/users',
      reqType: 'get',
      method(req, res, next) {
        let action = 'Search for Users'
        let querySelector = req.query.querySelector
        let search = req.query.input
        Users.find({ [querySelector]: search }).select('username firstname lastname _id')
          .then(users => {
            res.send(handleResponse(action, users))//send updated user info to store
          }).catch(error => {
            return next(handleResponse(action, null, error))
          })
      }
    }


  }
}

function handleResponse(action, data, error) {
  var response = {
    action: action,
    data: data
  }
  if (error) {
    response.error = error
  }
  return response
}