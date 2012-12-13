/**
 *
 * Project: Infinite Desktop
 * Created by: Bruce
 * Date: 12/12/12
 * Copyright 2011 Gas Powered Games Corp. All rights reserved.
 */

// User memory store (would probably use redis for this)
var userList = [];

/////////////////////////////
// User Class
var user = function(id)
	{
	this.id = id;
	};

/////
// findUser(id) - Takes a socket.id, and returns a pointer if a match is found
function findUser(id)
	{
	for(var i = 0; i < userList.length; x++)
		{
		if (userList[i] === id)
			return i;
		}
	return false;
	}

/////
// addUser(id) - creates a user object, adds it to the memory-store, and returns a reference
function addUser(id)
	{
	var user1 = new user(id);

	if (!findUser(id)) // Don't add a user if they already exists
		{
		console.log("new user: "+ user1.id);
		userList.push(user1);
		}

	return user1;
	}

/////
// removeUser(id) - looks for a socket.id in userList, and removes it
function removeUser(id)
	{
	var userExist = findUser(id);

	if (!userExist)
		userList.splice(userExist, 1);
	}


exports.removeUser = removeUser;
exports.addUser = addUser;
exports.userList = userList;
