// feature
class FriendsList {
  friends = [];

  addFriend(name) {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name) {
    global.console.log(`${name} is now a friend!`);
  }

  removeFriend(name) {
    const idx = this.friends.indexOf(name);

    if (idx === -1) {
      throw new Error('Friends not found!');
    }

    this.friends.splice(idx, 1);
  }
}

// test
describe('FriendshipList', () => {
  let friendsList;

  beforeEach(() => {
    friendsList = new FriendsList();
  });

  it('initialize friends list', () => {
    expect(friendsList.friends.length).toEqual(0);
  });

  it('adds a friend to the list', () => {
    friendsList.addFriend('Lysak');
    expect(friendsList.announceFriendship.length).toEqual(1);
  });

  it('announces friendship', () => {
    friendsList.announceFriendship = jest.fn();

    expect(friendsList.announceFriendship).not.toHaveBeenCalled();
    friendsList.addFriend('Lysak');
    expect(friendsList.announceFriendship).toHaveBeenCalledWith('Lysak');
  });

  describe('removeFriends', () => {
    it('removes a friend from this list', () => {
      friendsList.addFriend('Lysak');
      expect(friendsList.friends[0]).toEqual('Lysak');
      friendsList.removeFriend('Lysak');
      expect(friendsList.friends[0]).toBeUndefined();
    });

    it('throw an error as friend boes not exists', () => {
      expect(() => friendsList.removeFriend('Lysak')).toThrow(new Error('Friends not found!'));
    });
  })
});