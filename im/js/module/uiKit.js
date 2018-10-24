define([
	'sessionList',
	'friendList',
	'teamList'
], function(
	SessionList,
	FriendList,
	TeamList
) {
	'use strict';
	return {
		SessionList: SessionList,
		FriendList: FriendList,
		TeamList: TeamList
	}
});