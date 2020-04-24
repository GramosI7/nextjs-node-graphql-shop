export const hasPermission = (user, permissionsNeeded) => {
  const matchedPermissions = [];

  permissionsNeeded.forEach((element, index) => {
    if (element === user.role) {
      matchedPermissions.push(element);
    }
  });

  // if is good go return true
  if (matchedPermissions.length) {
    return true;
  } else {
    throw new Error(`You do not have sufficient permissions
    : ${permissionsNeeded}
    You Have:
    ${user.role}
    `);
  }
};
