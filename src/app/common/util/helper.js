import arrayToTree from 'array-to-tree';

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

// export const createDataTree = dataset => {
//   let hashTable = Object.create(null);
//   dataset.forEach(a => (hashTable[a.id] = { ...a, childNodes: [] }));
//   let dataTree = [];
//   dataset.forEach(a => {
//     if (a.parentId) hashTable[a.parentId].childNodes.push(hashTable[a.id]);
//     else dataTree.push(hashTable[a.id]);
//   });
//   return dataTree;
// };

// export const createDataTree = dataset => {
//   return dataset.map(data => {
//     let childNodes = dataset.filter(
//       newData => data.key === newData.value.parentId
//     );

//     return {
//       ...data,
//       childNodes: childNodes,
//     };
//   });
// };

export const createDataTree = dataset => {
  const datasetFormat = dataset.map(data => ({
    ...data,
    parentId: data.value.parentId,
  }));

  const dataTree = arrayToTree(datasetFormat, {
    customID: 'key',
    parentProperty: 'parentId',
  });

  return dataTree;
};
