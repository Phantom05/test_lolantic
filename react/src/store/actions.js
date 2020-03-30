import {createAction} from 'redux-actions';
import {makeAsyncCreateActions,makeAsyncActions} from 'lib/utils';
import * as API from 'lib/api';

// Action
export const BASE_EXIT_LANDING  = 'base/BASE_EXIT_LANDING';
export const BASE_ENTER_LANDING = 'base/BASE_ENTER_LANDING';

export const base_exit_landing  = createAction(BASE_EXIT_LANDING);
export const base_enter_landing = createAction(BASE_ENTER_LANDING);

export const BASE_NETWORK_CONNECT = 'base/BASE_NETWORK_CONNECT';
export const base_network_connect  = createAction(BASE_NETWORK_CONNECT);

export const BASE_MESSAGE_GET = 'base/BASE_MESSAGE/GET';
export const base_message_get = createAction(BASE_MESSAGE_GET);

export const BASE_LANGUAGE_CHANGE = 'base/BASE_LANGUAGE_CHANGE';
export const base_language_change  = createAction(BASE_LANGUAGE_CHANGE);

export const BASE_SCROLLBARS_CONTROL  = 'base/BASE_SCROLLBARS_CONTROL';
export const base_scrollbars_control  = createAction(BASE_SCROLLBARS_CONTROL);

export const INFO_CASE_TYPE_CHANGE      = 'info/INFO_CASE_TYPE_CHANGE';
export const info_case_type_change = createAction(INFO_CASE_TYPE_CHANGE);

export const INFO_CASE_INIT      = 'info/INFO_CASE_INIT';
export const info_case_init = createAction(INFO_CASE_INIT);

export const LISTING_SELECT_PANEL = 'listing/LISTING_SELECT_PANEL';
export const listing_select_panel  = createAction(LISTING_SELECT_PANEL);

export const LISTING_WORKS_LIST_UPDATE = 'listing/LISTING_WORKS_LIST_UPDATE';
export const listing_works_list_update  = createAction(LISTING_WORKS_LIST_UPDATE);

export const INFO_WORKS_CLOUD_RESET = 'info/INFO_WORKS_CLOUD_RESET';
export const info_works_cloud_reset  = createAction(INFO_WORKS_CLOUD_RESET);

export const AUTH_RENDER = 'auth/FIRST_RENDER';
export const auth_first_render = createAction(AUTH_RENDER);


// Sagas
export const COMMON_EXECUTOR_NAV = 'common/COMMON_EXECUTOR_NAV';
export const common_executor_nav = createAction(COMMON_EXECUTOR_NAV);

export const AUTH_INIT = 'auth/AUTH_INIT';
export const auth_init = createAction(AUTH_INIT);

export const AUTH_TOKEN       = makeAsyncActions('auth/AUTH_TOKEN');
export const AUTH_TOKEN_SAGAS = makeAsyncCreateActions(AUTH_TOKEN)(API.postToken);

export const AUTH_SIGNIN       = makeAsyncActions('auth/AUTH_SIGNIN');
export const AUTH_SIGNIN_SAGAS = makeAsyncCreateActions(AUTH_SIGNIN)(API.postSignin);

export const AUTH_LOGOUT       = makeAsyncActions('auth/AUTH_LOGOUT');
export const AUTH_LOGOUT_SAGAS = makeAsyncCreateActions(AUTH_LOGOUT)(API.postLogout);

export const AUTH_SIGNUP       = makeAsyncActions('auth/AUTH_SIGNUP');
export const AUTH_SIGNUP_SAGAS = makeAsyncCreateActions(AUTH_SIGNUP)(API.postSignUp);

export const AUTH_VERIFY_EMAIL       = makeAsyncActions('auth/AUTH_VERIFY_EMAIL');
export const AUTH_VERIFY_EMAIL_SAGAS = makeAsyncCreateActions(AUTH_VERIFY_EMAIL)(API.postVerifyEmail);

export const AUTH_RESET_VERIFY_EMAIL       = makeAsyncActions('auth/AUTH_RESET_VERIFY_EMAIL');
export const AUTH_RESET_VERIFY_EMAIL_SAGAS = makeAsyncCreateActions(AUTH_RESET_VERIFY_EMAIL)(API.postResetVerifyEmail);

export const AUTH_VERIFY_CODE       = makeAsyncActions('auth/AUTH_VERIFY_CODE');
export const AUTH_VERIFY_CODE_SAGAS = makeAsyncCreateActions(AUTH_VERIFY_CODE)(API.postVerifyCode);

export const AUTH_RESETPASS       = makeAsyncActions('auth/AUTH_RESETPASS');
export const AUTH_RESETPASS_SAGAS = makeAsyncCreateActions(AUTH_RESETPASS)(API.postResetPassword);

export const AUTH_CHANGEPASS       = makeAsyncActions('auth/AUTH_CHANGEPASS');
export const AUTH_CHANGEPASS_SAGAS = makeAsyncCreateActions(AUTH_CHANGEPASS)(API.postChangePassword);

export const AUTO_LOGIN       = makeAsyncActions('auth/AUTO_LOGIN');
export const AUTO_LOGIN_SAGAS = makeAsyncCreateActions(AUTO_LOGIN)(API.postAutoLogin);

export const INFO_INFORMATION      = makeAsyncActions('info/INFO_INFORMATION');
export const INFO_INFORMATION_SAGAS = makeAsyncCreateActions(INFO_INFORMATION)(API.postGetMyInfo);

export const INFO_INFORMATION_UPDATE      = makeAsyncActions('info/INFO_INFORMATION_UPDATE');
export const INFO_INFORMATION_UPDATE_SAGAS = makeAsyncCreateActions(INFO_INFORMATION_UPDATE)(API.postUpdateMyInfo);

export const INFO_PARTNERS      = makeAsyncActions('info/INFO_PARTNERS');
export const INFO_PARTNERS_SAGAS = makeAsyncCreateActions(INFO_PARTNERS)(API.postGetPartnerInfo);

export const INFO_UPDATE_MY_OPTION      = makeAsyncActions('info/INFO_UPDATE_MY_OPTION');
export const INFO_UPDATE_MY_OPTION_SAGAS = makeAsyncCreateActions(INFO_UPDATE_MY_OPTION)(API.postUpdateOption);


export const LISTING_COUNTRY = makeAsyncActions('listing/LISTING_COUNTRY');
export const LISTING_COUNTRY_SAGAS = makeAsyncCreateActions(LISTING_COUNTRY)(API.postGetCountryList);

export const LISTING_LOCATION = makeAsyncActions('listing/LISTING_LOCATION');
export const LISTING_LOCATION_SAGAS = makeAsyncCreateActions(LISTING_LOCATION)(API.postGetLocationList); 

export const LISTING_CASE_LOAD = makeAsyncActions('listing/LISTING_CASE_LOAD');
export const LISTING_CASE_LOAD_SAGAS = makeAsyncCreateActions(LISTING_CASE_LOAD)(API.postGetCaseList); 

export const LISTING_PARTNERS_INFO = makeAsyncActions('listing/LISTING_PARTNERS_INFO');
export const LISTING_PARTNERS_INFO_SAGAS = makeAsyncCreateActions(LISTING_PARTNERS_INFO)(API.postGetPartnersList); 

export const LISTING_PARTNERS_MY_ADD = makeAsyncActions('listing/LISTING_PARTNERS_MY_ADD');
export const LISTING_PARTNERS_MY_ADD_SAGAS = makeAsyncCreateActions(LISTING_PARTNERS_MY_ADD)(API.postGetMyPartnersListAdd);

export const LISTING_PARTNERS_MY_DEFAULT_ADD = makeAsyncActions('listing/LISTING_PARTNERS_MY_DEFAULT_ADD');
export const LISTING_PARTNERS_MY_DEFAULT_ADD_SAGAS = makeAsyncCreateActions(LISTING_PARTNERS_MY_DEFAULT_ADD)(API.postGetMyPartnersListDefaultAdd);

export const LISTING_PARTNERS_MY_DELETE = makeAsyncActions('listing/LISTING_PARTNERS_MY_DELETE');
export const LISTING_PARTNERS_MY_DELETE_SAGAS = makeAsyncCreateActions(LISTING_PARTNERS_MY_DELETE)(API.postGetMyPartnersListDelete);

export const LISTING_PARTNERS_SEARCH = makeAsyncActions('listing/LISTING_PARTNERS_SEARCH');
export const LISTING_PARTNERS_SEARCH_SAGAS = makeAsyncCreateActions(LISTING_PARTNERS_SEARCH )(API.postGetPartnersSearchList);

export const LISTING_MY_PARTNERS = makeAsyncActions('listing/LISTING_MY_PARTNERS');
export const LISTING_MY_PARTNERS_SAGAS = makeAsyncCreateActions(LISTING_MY_PARTNERS )(API.postGetMyPartnersList);

export const LISTING_PARTNERS_TYPE = makeAsyncActions('listing/LISTING_PARTNERS_TYPE');
export const LISTING_PARTNERS_TYPE_SAGAS = makeAsyncCreateActions(LISTING_PARTNERS_TYPE )(API.postGetPartnersTypeList);

export const LISTING_TEST = makeAsyncActions('listing/LISTING_TEST');
export const LISTING_TEST_SAGAS = makeAsyncCreateActions(LISTING_TEST )(API.getTest);

export const LISTING_WORKS_SEARCH = makeAsyncActions('listing/LISTING_WORKS_SEARCH');
export const LISTING_WORKS_SEARCH_SAGAS = makeAsyncCreateActions(LISTING_WORKS_SEARCH)(API.postGetWorksSearchList);

export const LISTING_WORKS_GET_LIST_UPDATE = makeAsyncActions('listing/LISTING_WORKS_GET_LIST_UPDATE');
export const LISTING_WORKS_GET_LIST_UPDATE_SAGAS = makeAsyncCreateActions(LISTING_WORKS_GET_LIST_UPDATE)(API.postGetWorksSearchList);

export const INFO_CASE_CREATE      = makeAsyncActions('info/INFO_CASE_CREATE');
export const INFO_CASE_CREATE_SAGAS = makeAsyncCreateActions(INFO_CASE_CREATE)(API.postCreateCase);

export const INFO_CASE_LOAD      = makeAsyncActions('info/INFO_CASE_LOAD');
export const INFO_CASE_LOAD_SAGAS = makeAsyncCreateActions(INFO_CASE_LOAD)(API.postGetCaseLoad);

export const INFO_CASE_DELETE      = makeAsyncActions('info/INFO_CASE_DELETE');
export const INFO_CASE_DELETE_SAGAS = makeAsyncCreateActions(INFO_CASE_DELETE)(API.postDeleteCase);

export const INFO_CASE_UPDATE      = makeAsyncActions('info/INFO_CASE_UPDATE');
export const INFO_CASE_UPDATE_SAGAS = makeAsyncCreateActions(INFO_CASE_UPDATE)(API.postCaseUpdate);

export const INFO_WORKS_CASE_UPDATE      = makeAsyncActions('info/INFO_WORKS_CASE_UPDATE');
export const INFO_WORKS_CASE_UPDATE_SAGAS = makeAsyncCreateActions(INFO_WORKS_CASE_UPDATE)(API.postWorksCaseUpdate);
export const INFO_CASE_COMPLETE      = makeAsyncActions('info/INFO_CASE_COMPLETE');
export const INFO_CASE_COMPLETE_SAGAS = makeAsyncCreateActions(INFO_CASE_COMPLETE)(API.postCaseComplete);

export const INFO_CASE_FILE_LIST_COUNT      = makeAsyncActions('info/INFO_CASE_FILE_LIST_COUNT');
export const INFO_CASE_FILE_LIST_COUNT_SAGAS = makeAsyncCreateActions(INFO_CASE_FILE_LIST_COUNT)(API.postGetCaseListCount);

export const INFO_CASE_INIT_DATA      = makeAsyncActions('info/INFO_CASE_INIT_DATA');
export const INFO_CASE_INIT_DATA_SAGAS = makeAsyncCreateActions(INFO_CASE_INIT_DATA)(API.postGetCaseInit);

export const INFO_PARTNERS_MODAL_INFO = makeAsyncActions('info/INFO_PARTNERS_MODAL_INFO');
export const INFO_PARTNERS_MODAL_INFO_SAGAS = makeAsyncCreateActions(INFO_PARTNERS_MODAL_INFO)(API.postGetMyPartnersListModal);

export const MESSAGE_UPDATE = makeAsyncActions('message/MESSAGE_UPDATE');
export const MESSAGE_UPDATE_SAGAS = makeAsyncCreateActions(MESSAGE_UPDATE)(API.postMessageUpdate);

export const MESSAGE_LIST = makeAsyncActions('message/MESSAGE_LIST');
export const MESSAGE_LIST_SAGAS = makeAsyncCreateActions(MESSAGE_LIST)(API.postGetMessageList);

export const INFO_WORKS_DETAIL      = makeAsyncActions('info/INFO_WORKS_DETAIL');
export const INFO_WORKS_DETAIL_SAGAS = makeAsyncCreateActions(INFO_WORKS_DETAIL)(API.postGetWorksDetail);


export const INFO_WORKS_CHECK_READ      = makeAsyncActions('info/INFO_WORKS_CHECK_READ');
export const INFO_WORKS_CHECK_READ_SAGAS = makeAsyncCreateActions(INFO_WORKS_CHECK_READ)(API.postCheckWorksRead);

export const INFO_WORKS_CHECK_DOWNLOAD      = makeAsyncActions('info/INFO_WORKS_CHECK_DOWNLOAD');
export const INFO_WORKS_CHECK_DOWNLOAD_SAGAS = makeAsyncCreateActions(INFO_WORKS_CHECK_DOWNLOAD)(API.postCheckWorksFileDownload);

export const INFO_WORKS_APP_DATA_UPLOAD      = makeAsyncActions('info/INFO_WORKS_APP_DATA_UPLOAD');
export const INFO_WORKS_APP_DATA_UPLOAD_SAGAS = makeAsyncCreateActions(INFO_WORKS_APP_DATA_UPLOAD)(API.postAppDataUpload);

export const INFO_WORKS_APP_DATA_DOWNLOAD      = makeAsyncActions('info/INFO_WORKS_APP_DATA_DOWNLOAD');
export const INFO_WORKS_APP_DATA_DOWNLOAD_SAGAS = makeAsyncCreateActions(INFO_WORKS_APP_DATA_DOWNLOAD)(API.postAppDataDownload);

export const INFO_WORKS_DIRECT_FILE_UPLOAD      = makeAsyncActions('info/INFO_WORKS_DIRECT_FILE_UPLOAD');
export const INFO_WORKS_DIRECT_FILE_UPLOAD_SAGAS = makeAsyncCreateActions(INFO_WORKS_DIRECT_FILE_UPLOAD)(API.postWorksDirectFileUpload);

export const INFO_WORKS_DIRECT_FILE_DOWNLOAD      = makeAsyncActions('info/INFO_WORKS_DIRECT_FILE_DOWNLOAD');
export const INFO_WORKS_DIRECT_FILE_DOWNLOAD_SAGAS = makeAsyncCreateActions(INFO_WORKS_DIRECT_FILE_DOWNLOAD)(API.postWorksDirectFileDownload);

export const INFO_WORKS_DIRECT_FILE_DELETE      = makeAsyncActions('info/INFO_WORKS_DIRECT_FILE_DELETE');
export const INFO_WORKS_DIRECT_FILE_DELETE_SAGAS = makeAsyncCreateActions(INFO_WORKS_DIRECT_FILE_DELETE)(API.postWorksDirectFileDelete);

export const INFO_WORKS_CARD_HIDE = makeAsyncActions('info/INFO_WORKS_CARD_HIDE');
export const INFO_WORKS_CARD_HIDE_SAGAS = makeAsyncCreateActions(INFO_WORKS_CARD_HIDE)(API.postWorksCardHide);


export const MESSAGE_LIST_DELETE = makeAsyncActions('message/MESSAGE_LIST_DELETE');
export const MESSAGE_LIST_DELETE_SAGAS = makeAsyncCreateActions(MESSAGE_LIST_DELETE)(API.postDeleteMessageList);

export const MESSAGE_LIST_DELETE_ALL = makeAsyncActions('message/MESSAGE_LIST_DELETE_ALL');
export const MESSAGE_LIST_DELETE_ALL_SAGAS = makeAsyncCreateActions(MESSAGE_LIST_DELETE_ALL)(API.postDeleteMessageListAll);

export const MESSAGE_LIST_READ = makeAsyncActions('message/MESSAGE_LIST_READ');
export const MESSAGE_LIST_READ_SAGAS = makeAsyncCreateActions(MESSAGE_LIST_READ)(API.postMessageRead);

export const WORKSPACE_GET = makeAsyncActions('info/WORKSPACE_GET');
export const WORKSPACE_GET_SAGAS = makeAsyncCreateActions(WORKSPACE_GET)(API.postWorkspaceGet);

export const WORKSPACE_SET = makeAsyncActions('info/WORKSPACE_SET');
export const WORKSPACE_SET_SAGAS = makeAsyncCreateActions(WORKSPACE_SET)(API.postWorkspaceSet);

export const CHANGE_PROFILE = makeAsyncActions('info/CHANGE_PROFILE');
export const CHANGE_PROFILE_SAGAS = makeAsyncCreateActions(CHANGE_PROFILE)(API.postChangeProfile);
export const COMMON_EXE_NAV_SUBMIT = makeAsyncActions('common/COMMON_EXE_NAV_SUBMIT');
export const COMMON_EXE_NAV_SUBMIT_SAGAS = makeAsyncCreateActions(COMMON_EXE_NAV_SUBMIT)(API.postExeNavSubmit);

export const SHORTCUT_EXE = makeAsyncActions('info/SHORTCUT_EXE');
export const SHORTCUT_EXE_SAGAS = makeAsyncCreateActions(SHORTCUT_EXE)(API.postUploadShortCutExe);

export const CASE_SYNC = makeAsyncActions('case/CASE_SYNC');
export const CASE_SYNC_SAGAS = makeAsyncCreateActions(CASE_SYNC)(API.postCaseSync);

// test
export const LISTING_TEST_LIST = makeAsyncActions('listing/LISTING_TEST_LIST');
export const LISTING_TEST_LIST_SAGAS = makeAsyncCreateActions(LISTING_TEST_LIST)(API.postTestPageList);