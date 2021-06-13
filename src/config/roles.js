const roles = ['user', 'admin', 'iotDevice'];

const roleRights = new Map();
roleRights.set(roles[0], []);
roleRights.set(roles[1], ['getUsers', 'manageUsers', 'iotRX', 'iotTX']);
roleRights.set(roles[3], ['iotTX', 'iotRX']);


module.exports = {
  roles,
  roleRights,
};
