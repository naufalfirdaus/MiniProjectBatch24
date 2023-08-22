import { combineReducers } from 'redux';
import userReducer from './userReducer';
import employeeReducer from './employeeReducer';
import loginReducer from './loginReducer';
import BankReducer from './bankReducer';
import FintechReducer from './fintechReducer';
import UsersAccountReducer from './usersAccountReducer';
import TransactionReducer from './trpaReducer';

const rootReducer = combineReducers({
  user: userReducer,
  employee: employeeReducer,
  login: loginReducer,
  bankState: BankReducer,
  fintechState: FintechReducer,
  usersAccState: UsersAccountReducer,
  trpaState: TransactionReducer,
});

export default rootReducer;
