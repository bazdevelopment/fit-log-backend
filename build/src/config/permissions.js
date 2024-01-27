"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN_EMAILS = exports.ADMIN_ROLE_PERMISSIONS = exports.USER_ROLE_PERMISSIONS = void 0;
const permissions_name_1 = require("../enums/permissions-name");
exports.USER_ROLE_PERMISSIONS = {
    [permissions_name_1.PERMISSIONS_NAME.CAN_ADD_NEW_ROLE_TO_AN_USER]: false,
    [permissions_name_1.PERMISSIONS_NAME.CAN_REMOVE_A_ROLE_FROM_AN_USER]: false,
    [permissions_name_1.PERMISSIONS_NAME.CAN_CREATE_NEW_ROLES]: false,
    [permissions_name_1.PERMISSIONS_NAME.CAN_DELETE_ROLES]: false,
    [permissions_name_1.PERMISSIONS_NAME.CAN_CREATE_NEW_EXERCISES]: false,
    [permissions_name_1.PERMISSIONS_NAME.CAN_DELETE_EXERCISES]: false,
};
exports.ADMIN_ROLE_PERMISSIONS = {
    [permissions_name_1.PERMISSIONS_NAME.CAN_ADD_NEW_ROLE_TO_AN_USER]: true,
    [permissions_name_1.PERMISSIONS_NAME.CAN_REMOVE_A_ROLE_FROM_AN_USER]: true,
    [permissions_name_1.PERMISSIONS_NAME.CAN_CREATE_NEW_ROLES]: true,
    [permissions_name_1.PERMISSIONS_NAME.CAN_DELETE_ROLES]: true,
    [permissions_name_1.PERMISSIONS_NAME.CAN_CREATE_NEW_EXERCISES]: true,
    [permissions_name_1.PERMISSIONS_NAME.CAN_DELETE_EXERCISES]: true,
};
exports.ADMIN_EMAILS = ["bazilucm@gmail.com"];
