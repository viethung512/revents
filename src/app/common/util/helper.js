export const createNewEvent = (user, photoURL, event) => ({
  ...event,
  hostUid: user.uid,
  hostedBy: user.displayName,
  hostPhotoURL: photoURL || '/assets/user.png',
  created: Date.now(),
  attendees: {
    [user.uid]: {
      going: true,
      joinDate: Date.now(),
      photoURL: photoURL || 'assets/user.png',
      displayName: user.displayName,
      host: true,
    },
  },
  cancelled: false,
});

export const objectToArray = object => {
  if (object && Object.keys(object).length > 0) {
    const result = [];
    for (let key in object) {
      result.push({ id: key, ...object[key] });
    }

    return result;
  } else {
    return [];
  }
};
