import { UserInputError } from "apollo-server-core";

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
    throw new UserInputError("Errors !", {
      general: `You do not have sufficient permissions: ${permissionsNeeded}. You have: ${user.role}`,
    });
  }
};
