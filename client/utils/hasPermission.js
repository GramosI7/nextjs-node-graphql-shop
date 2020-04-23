export const hasPermission = (user, permissionsNeeded) => {
  const matchedPermissions = [];

  permissionsNeeded.forEach((element, index) => {
    if (element === user.role) {
      matchedPermissions.push(element);
    }
  });

  console.log(matchedPermissions);
  // if is good go return true
  if (matchedPermissions.length) {
    return true;
  }
};
