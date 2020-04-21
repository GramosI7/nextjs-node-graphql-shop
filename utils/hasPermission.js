export const hasPermission = (user, permission) => {
  // console.log(user.role !== permission);
  if (user.role !== permission) {
    throw new Error(`You do not have sufficient permissions
      : ${permission}
      You Have:
      ${user.role}
      `);
  }
};
