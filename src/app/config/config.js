
import history from '../../history';
const serverVars = {
  // proxyurl: "https://cors-anywhere.herokuapp.com/",
  baseUrl: "https://api.cubevest.com/api/",
  authUrl: "auth/login",
  regUrl: "auth/signup",
  resetPass: "profilesChangePassword?token=",
  verifypass:"auth/reset",
  verifyemail:"auth/signupVerifyEmail/",
  recoverpass:"auth/recovery",
  // regular savings
  fetchAllBalances: "total_balances_for_all_savings_packages?token=",
  fetchAllTarget: "all_targets_in_one?token=",
  fetchAllTargetAccount:"all_targets_plan_per_user?token=",
  fetchAllSaveToLoan: "save_to_loan_all_api?token=",

  saveRegularSavings: "saving/store?token=",
  getRegularSavings: "saving?token=",
  editRegularSavings: "saving/",
  addFundRegularSavings: "savingsFunds?token=",
  withdrawRegularSavings: "savingsWithdrawal?token=",
  totalFundRegularSavings: "savingsBalance?token=",
  getRegularSavingsDetails: "savingsTransactions?token=",
  deactivateAutoSave:"deactivateAutoSave?token=",
  // target savings   
  saveTargetSavings: "targets/store?token=",
  getTargetSavings: "targets?token=",
  getTargetTransaction:"targets/transactions/",
  exitTargetSavings:"targetsExit/",
  getTotalTargetFund:"targets/total_funds/",
  totalTargetFund:"all_targets_sum_per_user?token=",
  editTargetSavings: "targets/",
  addFundTargetSavings: "targets/add_funds/",
  withdrawTargetSavings: "targets/add_withdrawal/",
  targetDetails:"targets/details/",
  activateTargetAutosave: "targetsActivateAutoSave/",
  deactivateTargetAutosave: "targetsDeactivateAutoSave/",
  // save to loan savings
  saveSaveToLoanSavings: "save_loan/store?token=",
  getSaveToLoanSavings: "save_loan?token=",
  editSaveToLoanSavings: "save_loan/modify/",
  addFundSaveToLoanSavings: "save_loan/add_funds?token=",
  withdrawSaveToLoanSavings: "save_loan/add_withdrawal?token=",
  totalFundSaveToLoanSavings: "all_funds?token=",
  getSaveToLoanTransaction:"save_loan/transactions/",
  exitLoanSavings:"saveLoanExit/",
  deactivateAutoSaveLoan:"deactivateAutoSaveLoan?token=",
  //other transaction
  saveInvestment: "save_investment/store?token=",
  getInvestments: "show_all_investment?token=",
  getSingleInvestment: "single_investment/",
  addMarketPlace: "market_place/add_investment?token=",
  //other transaction
  saveHalaiInvestment: "save_halai/store?token=",
  getHalaiNews: "show_all_halai?token=",
  getSingleHalai: "single_halai/",
  addHalaiInvestors: "halai/add_investment?token=",
  getTotalMarketFund:"marketTotal?token=",
  getTotalHalalFund:"halaiTotal?token=",
  // addProfile: "profiles/store?token=",
  showProfile:"show_profile?token=",
  updatePicture:"profiles/updatePics?token=",
  updateProfile:"profiles/update?token=",


  // Loan  
  createLoanGroup:"loan/create_loan_group?token=",
  createLoan:"loanAdd?token=",
  joinGroup:"loan/join_group?token=",
  rejectGroup:"loan/reject_group/",
  exitGroup:"loan/exit_group/",
  getLoanGroup:"loan/loan_group?token=",
  getLoan:"loan/view_loan?token=",
  getLoanDetails:"loanDetails/",
  getLoanActivities:"loanGroupDetailsActivities/",
  getLoanGroupMembers:"loanGroupMembers/",
  getLoanGroupActivities:"loanGroupApproval/",
  addLoanRepayment:"loanRepaymentsAdd/",
  loanRepaymentsDetails:"loanRepaymentsDetails/",
  getLoanGroupName:"loanGroupName?token=",
  declineLoan:"loanDeclined/",
  acceptLoan: "loanAccepted/",
  getLoanGroupApproval:"loanGroupApprovalDetails/",
  resendGroupNotification:"loan/resend_join_notification/",
  resendLoanNotification:"loanResendNotification/",
  getLoanGroupDetails:"loan/group_request_details/",
  replaceMember:"loanReplaceMembers/",
  removeMember:"loan/replace_member?token=",
  loanBalance:"loanBalance/",
  completedLoan:"getCompletedLoans?token=",

  showTransaction: "transactions/details?token=",
  saveWallet: "save_wallet/store?token=",
  saveBank: "bank_account/add?token=",
  getBank:'bank_account/details?token=',
  updateBank:"bank_accountUpdate?token=",
  saveWithdrawal: "save_withdrawal/add?token=",
  showWallet: "show_wallet?token=",
  showWithdrawal: "show_withdrawal/",
  showWalletBalance: "show_wallet_balance?token=",
  showMyMarketInvestment:"user_investments?token=",
  showMyHalalInvestment:"user_halai?token=",
  getInvestmentCat:"show_category?token=",
  getHalaiCat:"show_halai_category?token=",
  getInvestmentNews:"show_halai/",
  getMarketNews:"show_investment/"
};

export const numberFormat = (value) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(value);

export const payID = () => {
  return "pk_test_d96f199a0651f1162b81c56256d5842372b845f2";
};

export const getReference = () => {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";
  for( let i=0; i < 15; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

export const setLastUrl = () =>{
  var lasturl = window.location.href;
  var pathname = new URL(lasturl).pathname;
  localStorage.setItem("lasturl", pathname);
}

export const checkLastUrl=()=>{
  let pathname = localStorage.getItem("lasturl");
  if (pathname == null || pathname == "") {
    history.push({
      pathname: "/dashboard"
    });
    }else{
      history.push({
        pathname: pathname
      });
    }
}

export const checkToken = ()=>{
  let pathname = localStorage.getItem("lasturl");
  let token =  JSON.parse(localStorage.getItem('user'));
    if (token == null || token == "") {
      history.push({
        pathname: "/signin"
      });
      }else{
        history.push({
          pathname: pathname
        });
      }
}

export function getConfig(apiName) {
  let user = JSON.parse(localStorage.getItem("user"));
  if ((apiName != 'login') && user == null) {
    if(apiName != "signup"){
      if(apiName != "recoverpass"){
        if(apiName != "verifypass"){
          if(apiName != "verifyemail"){
            history.push('/signin');
            return
          }
        }
      }
    }
    
  }
  switch (apiName) {
    case "login":
      return serverVars.baseUrl + serverVars.authUrl;
    case "recoverpass":
      return serverVars.baseUrl + serverVars.recoverpass;
    case "verifyemail":
      return serverVars.baseUrl + serverVars.verifyemail;
    case "verifypass":
      return serverVars.baseUrl + serverVars.verifypass;
    case "resetPass":
      return serverVars.baseUrl + serverVars.resetPass + user.token;
    case "signup":
      return serverVars.baseUrl + serverVars.regUrl;
    // regular savings api
    case "editRegularSavings":
      return serverVars.baseUrl + serverVars.editRegularSavings;
    case "addFundRegularSavings":
      return serverVars.baseUrl + serverVars.addFundRegularSavings + user.token;
    case "getRegularSavings":
      return serverVars.baseUrl + serverVars.getRegularSavings + user.token;
    case "saveRegularSavings":
      return serverVars.baseUrl + serverVars.saveRegularSavings + user.token;
    case "fetchAllBalances":
      return serverVars.baseUrl + serverVars.fetchAllBalances + user.token;
    case "fetchAllTarget":
      return serverVars.baseUrl + serverVars.fetchAllTarget + user.token;
    case "fetchAllSaveToLoan":
      return serverVars.baseUrl + serverVars.fetchAllSaveToLoan + user.token;
    case "fetchAllTargetAccount":
      return serverVars.baseUrl + serverVars.fetchAllTargetAccount + user.token;
    case "withdrawRegularSavings":
      return serverVars.baseUrl + serverVars.withdrawRegularSavings + user.token
    case "totalFundRegularSavings":
      return serverVars.baseUrl + serverVars.totalFundRegularSavings + user.token
    case "getRegularSavingsDetails":
      return  serverVars.baseUrl + serverVars.getRegularSavingsDetails + user.token
    case "deactivateAutoSave":
      return  serverVars.baseUrl + serverVars.deactivateAutoSave + user.token
    // target savings api
    case "editTargetSavings":
      return serverVars.baseUrl + serverVars.editTargetSavings;
    case "getTargetTransaction":
      return serverVars.baseUrl + serverVars.getTargetTransaction;
    case "getTotalTargetFund":
      return serverVars.baseUrl + serverVars.getTotalTargetFund;
    case "totalTargetFund":
      return serverVars.baseUrl + serverVars.totalTargetFund + user.token;
    case "addFundTargetSavings":
      return serverVars.baseUrl + serverVars.addFundTargetSavings;
    case "getTargetSavings":
      return serverVars.baseUrl + serverVars.getTargetSavings + user.token;
    case "exitTargetSavings":
      return serverVars.baseUrl + serverVars.exitTargetSavings;
    case "saveTargetSavings":
      return serverVars.baseUrl + serverVars.saveTargetSavings + user.token;
    case "withdrawTargetSavings":
      return serverVars.baseUrl + serverVars.withdrawTargetSavings;
    case "targetDetails":
      return serverVars.baseUrl + serverVars.targetDetails;
    case "activateTargetAutosave":
      return serverVars.baseUrl + serverVars.activateTargetAutosave;
    case "deactivateTargetAutosave":
      return serverVars.baseUrl + serverVars.deactivateTargetAutosave;
    // save to loan savings api
    case "editSaveToLoanSavings":
      return serverVars.baseUrl + serverVars.editSaveToLoanSavings;
    case "addFundSaveToLoanSavings":
      return serverVars.baseUrl + serverVars.addFundSaveToLoanSavings + user.token
    case "totalFundSaveToLoanSavings":
      return serverVars.baseUrl + serverVars.totalFundSaveToLoanSavings + user.token
    case "getSaveToLoanSavings":
      return serverVars.baseUrl + serverVars.getSaveToLoanSavings + user.token;
    case "saveSaveToLoanSavings":
      return serverVars.baseUrl + serverVars.saveSaveToLoanSavings + user.token;
    case "withdrawSaveToLoanSavings":
      return serverVars.baseUrl + serverVars.withdrawSaveToLoanSavings + user.token
    case "getSaveToLoanTransaction":
      return serverVars.baseUrl + serverVars.getSaveToLoanTransaction
    case "exitLoanSavings":
      return serverVars.baseUrl + serverVars.exitLoanSavings
    case "deactivateAutoSaveLoan":
      return  serverVars.baseUrl + serverVars.deactivateAutoSaveLoan + user.token
    // Other transaction
    case "saveInvestment":
      return serverVars.baseUrl + serverVars.saveInvestment + user.token;
    case "getInvestments":
      return serverVars.baseUrl + serverVars.getInvestments + user.token;
    case "getSingleInvestment":
      return serverVars.baseUrl + serverVars.getSingleInvestment;
    case "addMarketPlace":
      return serverVars.baseUrl + serverVars.addMarketPlace + user.token;

    // Halal transaction
    case "saveHalaiInvestment":
      return serverVars.baseUrl + serverVars.saveHalaiInvestment + user.token;
    case "getHalaiNews":
      return serverVars.baseUrl + serverVars.getHalaiNews + user.token;
    case "getSingleHalai":
      return serverVars.baseUrl + serverVars.getSingleHalai;
    case "addHalaiInvestors":
      return serverVars.baseUrl + serverVars.addHalaiInvestors + user.token;
    case "getTotalMarketFund":
      return serverVars.baseUrl + serverVars.getTotalMarketFund + user.token;
    case "getTotalHalalFund":
      return serverVars.baseUrl + serverVars.getTotalHalalFund + user.token;
    
    case "createLoanGroup":
      return serverVars.baseUrl + serverVars.createLoanGroup + user.token;
    case "createLoan":
      return serverVars.baseUrl + serverVars.createLoan + user.token;
    case "joinGroup":
      return serverVars.baseUrl + serverVars.joinGroup + user.token;
    case "rejectGroup":
      return serverVars.baseUrl + serverVars.rejectGroup;
    case "exitGroup":
      return serverVars.baseUrl + serverVars.exitGroup;
    case "getLoanGroup":
      return serverVars.baseUrl + serverVars.getLoanGroup + user.token;
    case "getLoanGroupName":
      return serverVars.baseUrl + serverVars.getLoanGroupName + user.token;
    case "acceptLoan":
      return serverVars.baseUrl + serverVars.acceptLoan;
    case "declineLoan":
      return serverVars.baseUrl + serverVars.declineLoan;
    case "getLoan":
      return serverVars.baseUrl + serverVars.getLoan + user.token;
    case "getLoanDetails":
      return serverVars.baseUrl + serverVars.getLoanDetails;
    case "getLoanGroupApproval":
      return serverVars.baseUrl + serverVars.getLoanGroupApproval;
    case "getLoanGroupActivities":
      return serverVars.baseUrl + serverVars.getLoanGroupActivities;
    case "getLoanActivities":
      return serverVars.baseUrl + serverVars.getLoanActivities;
    case "getLoanGroupMembers":
      return serverVars.baseUrl + serverVars.getLoanGroupMembers;
    case "addLoanRepayment":
      return serverVars.baseUrl + serverVars.addLoanRepayment;
    case "loanRepaymentsDetails":
      return serverVars.baseUrl + serverVars.loanRepaymentsDetails;
    case "resendGroupNotification":
      return serverVars.baseUrl + serverVars.resendGroupNotification;
    case "resendLoanNotification":
      return serverVars.baseUrl + serverVars.resendLoanNotification;
    case "getLoanGroupDetails":
      return serverVars.baseUrl + serverVars.getLoanGroupDetails;
    case "replaceMember":
      return serverVars.baseUrl + serverVars.replaceMember;
    case "removeMember":
      return serverVars.baseUrl + serverVars.removeMember + user.token;
    case "loanBalance":
      return serverVars.baseUrl + serverVars.loanBalance;
    case "completedLoan":
      return serverVars.baseUrl + serverVars.completedLoan + user.token;

    case "addProfile":
      return serverVars.baseUrl + serverVars.addProfile + user.token;
    case "updateProfile":
      return serverVars.baseUrl + serverVars.updateProfile + user.token;
    case "updatePicture":
      return serverVars.baseUrl + serverVars.updatePicture + user.token;
    case "showTransaction":
      return serverVars.baseUrl + serverVars.showTransaction + user.token;
    case "showProfile":
      return serverVars.baseUrl + serverVars.showProfile + user.token;
    case "saveWallet":
      return serverVars.baseUrl + serverVars.saveWallet + user.token;
    case "saveBank":
      return serverVars.baseUrl + serverVars.saveBank + user.token;
    case "updateBank":
      return serverVars.baseUrl + serverVars.updateBank + user.token;
    case "getBank":
      return serverVars.baseUrl + serverVars.getBank + user.token;
    case "saveWithdrawal":
      return serverVars.baseUrl + serverVars.saveWithdrawal + user.token;
    case "showWallet":
      return serverVars.baseUrl + serverVars.showWallet  + user.token;
    case "showWithdrawal":
      return serverVars.baseUrl + serverVars.showWithdrawal;
    case "showWalletBalance":
      return serverVars.baseUrl + serverVars.showWalletBalance + user.token;
    case "showMyMarketInvestment":
      return serverVars.baseUrl + serverVars.showMyMarketInvestment;
    case "showMyHalalInvestment":
      return serverVars.baseUrl + serverVars.showMyHalalInvestment;
    case "getInvestmentCat":
      return serverVars.baseUrl + serverVars.getInvestmentCat;
    case "getHalaiCat":
      return serverVars.baseUrl + serverVars.getHalaiCat;
    case "getInvestmentNews":
      return serverVars.baseUrl + serverVars.getInvestmentNews;
    case "getMarketNews":
      return serverVars.baseUrl + serverVars.getMarketNews;
    default:
      return null;
  }
}
