import Cookies from 'universal-cookie';
import notification from "../../components/notification";
import actions from './actions';
import {all, takeEvery, put, call} from 'redux-saga/effects';
import {postApi} from "../api";
import {plaidPublicKey} from "../constants";
const cookies = new Cookies();

export function* getPublicToken() {
  if (!window.Plaid)
    return;
  let publicToken = yield new Promise((resolve) => {
    window.plaidHandler = window.Plaid.create({
      apiVersion: 'v2',
      clientName: 'Plaid Quickstart',
      env: 'production',
      product: ["transactions", "auth", "assets"], // assets
      key: plaidPublicKey,
      countryCodes: ['US', 'CA'],
      onSuccess: (public_token) => {
        resolve(public_token);
      },
      onLoad: () => {
        window.plaidHandler.open();
      },
      onExit: function(err, metadata) {
        if (err != null) {
          notification('error', err.error_message);
        } else {
          notification('error', 'Not connected to the bank');
        }
        resolve(false);
      },
    });
  });
  if (publicToken) {
    yield put(actions.getPlaidPublicTokenSuccess(publicToken));
  } else {
    yield put(actions.getPlaidPublicTokenFailed());
  }
}

export function* getAccessToken(data) {
  let res = yield call(postApi, {url: 'user/getPlaidAccessToken', data: data});
  console.log(res);
  if (res && res.status) {
    let now = new Date();
    now.setDate(now.getDate() + 90);
    cookies.set('accessToken', res.data.access_token, {path: '/', expires: now});
    cookies.set('assetReportToken', res.data.asset_report_token, {path: '/', expires: now});
    yield put(actions.getPlaidAccessTokenSuccess(res.data));
  } else {
    yield put(actions.getPlaidAccessTokenFailed());
  }
}

export function* getAccountInfo(data) {
  let res = yield call(postApi, {url: 'user/getAccountInfo', data: data});
  console.log(res.data);
  if (res && res.status) {
    if (!res.data.transactions.transactions) {
      notification('error', 'Information not prepared yet, please wait...');
    }
    yield put(actions.getAccountInfoSuccess(res.data));
  } else {
    console.log(res);
    yield put(actions.getAccountInfoFailed());
  }
}

export function* getAccountInfo1(data) {
  yield call(postApi, {url: 'user/getAccountInfo1', data: data});
}

export function* getAccountList(data) {
  let res = yield call(postApi, {url: 'user/getAccounts', data: data});
  if (res && res.status) {
    yield put(actions.getAccountListSuccess(res.data.accounts));
  } else {
    console.log(res);
    yield put(actions.getAccountListFailed());
  }
}

export function* getTransactionList(data) {
  let res = yield call(postApi, {url: 'user/getTransactions', data: data});
  if (res && res.status) {
    yield put(actions.getTransactionListSuccess(res.data.transactions));
  } else {
    yield put(actions.getTransactionListFailed());
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.GET_PUBLIC_TOKEN, getPublicToken),
    yield takeEvery(actions.GET_ACCESS_TOKEN, getAccessToken),
    yield takeEvery(actions.GET_ACCOUNT_INFO, getAccountInfo),
    yield takeEvery(actions.GET_ACCOUNT_INFO1, getAccountInfo1),
    yield takeEvery(actions.GET_ACCOUNT_LIST, getAccountList),
    yield takeEvery(actions.GET_TRANSACTION_LIST, getTransactionList)
  ]);
}
