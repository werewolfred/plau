let Users = require('../models/bounty')

module.exports = {
  // activeBounties: {
  //   path: '/',
  //   reqType: 'get',
  //   method(req, res, next) {
  //     let action = 'Find Active Bounties'
  //     Bounty.find({ userId: req.body.userId })
  //       .then(bounty => {
  //         res.send(handleResponse(action, bounty))
  //       }).catch(error => {
  //         return next(handleResponse(action, null, error))
  //       })
  //   }
  // },

  // userGame: {
  //   path: '/gamedata/:userId',
  //   reqType: 'put',
  //   method(req, res, next) {
  //     let action = 'Update User Info'
  //     Users.findByIdAndUpdate(req.params.userId, req.body)
  //       .then(user => {
  //         res.send(handleResponse(action, user))//send updated user info to store
  //       }).catch(error => {
  //         return next(handleResponse(action, null, error))
  //       })
  //   },
  newBounty: {
    path: 'bounties/:userId/activeBounties',
    reqType: 'post',
    method(req, res, next) {
      let action = 'Create New Bounty'
      Bounty.create(req.body)
        .then((bounty) => {
          res.send({
            message: 'Successfully created user account',
            data: bounty
          })
        })
        .catch(err => {
          res.send({ error: err })
        })
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