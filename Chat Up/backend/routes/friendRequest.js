const express = require ('express');
const FriendRequestController = require('../controllers/FriendRequest');

const router = express.Router();

// POST http://localhost:3001/api/friend-requests
router.post('/', FriendRequestController.sendFriendRequest);

// GET http://localhost:3001/api/friend-requests/received/pending/:uid
router.get('/received/pending/:uid', FriendRequestController.getPendingReceivedFriendRequests);

// GET http://localhost:3001/api/friend-requests/sent/pending/:uid
router.get('/sent/pending/:uid', FriendRequestController.getPendingSentFriendRequests);

// GET http://localhost:3001/api/friend-requests/received/accepted/:uid
router.get('/received/accepted/:uid', FriendRequestController.getAcceptedReceivedFriendRequests);

// GET http://localhost:3001/api/friend-requests/sent/accepted/:uid
router.get('/sent/accepted/:uid', FriendRequestController.getAcceptedSentFriendRequests);

// GET http://localhost:3001/api/friend-requests/:fromUserId/:toUserId
router.get('/:fromUserId/:toUserId', FriendRequestController.getFriendRequestById)

// PUT http://localhost:3001/api/friend-requests/:requestId/accept
router.put('/:requestId/accept', FriendRequestController.acceptFriendRequest);

// PUT http://localhost:3001/api/friend-requests/:requestId/reject
router.put('/:requestId/reject', FriendRequestController.rejectFriendRequest);

// DELETE http://localhost:3001/api/friend-requests/:requestId/delete
router.delete('/:requestId/delete', FriendRequestController.deleteFriendRequest);

module.exports = router