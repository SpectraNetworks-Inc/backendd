const roles = ['user', 'admin', 'iotDevice'];

const roleRights = new Map();

//User Permissions
roleRights.set(roles[0], ['createShortLinks']);


//Admin Permissions
roleRights.set(roles[1], ['getUsers', 'manageUsers', 'iotRX', 'iotTX', 'getAllShortLinks', 'createShortLinks', 'deleteShortLinks']);


//IoT Device Permissions
roleRights.set(roles[3], ['iotTX', 'iotRX']);


module.exports = {
  roles,
  roleRights,
};
