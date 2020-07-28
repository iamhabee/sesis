import { getConfig } from "../config/config";
import { authHeader } from "../redux/logic";
import history from "../../history";
export const userService = {
  login,
  relogin,
  logout,
  register,
  lostpassword,
  resetpassword,
  update,
  delete: _delete,
  // regular savings
  createRegularSavings,
  withdrawRegularSavings,
  addFundRegularSavings,
  editRegularSavings,
  deactivateAutoSave,
  deactivateAutoSaveLoan,
  // target savings
  createTargetSavings,
  withdrawTargetSavings,
  addFundTargetSavings,
  editTargetSavings,
  exitTargetSavings,
  // target savings
  createSaveToLoanSavings,
  withdrawSaveToLoanSavings,
  addFundSaveToLoanSavings,
  editSaveToLoanSavings,
  exitLoanSavings,

  // loan
  createLoanGroup,
  createLoan,
  acceptLoan,
  declineLoan,
  joinGroup,
  rejectGroup,
  exitGroup,
  addLoanRepayment,
  resendGroupNotification,
  resendLoanNotification,
  replaceMember,
  removeMember,

  // other transactions
  saveInvestment,
  getInvestments,
  getSingleInvestment,
  addMarketPlace,

  saveWallet,
  saveBank,
  updateBank,
  saveWithdrawal,

  // halal transactions
  saveHalaiInvestment,
  getHalaiNews,
  getSingleHalai,
  addHalaiInvestors,

  updatePicture,
  updateProfile
};

function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  return fetch(getConfig("login"), requestOptions)
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("email", user.email);
      localStorage.setItem("name", user.name);
      localStorage.setItem("profile_pic", user.profile_pic);

      return user;
    });
}

// regular savings methods
function addFundRegularSavings(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("addFundRegularSavings"), requestOptions).then(
    handleResponse
  );
}
function createRegularSavings(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("saveRegularSavings"), requestOptions).then(
    handleResponse
  );
}
function editRegularSavings(data) {
  let user = JSON.parse(localStorage.getItem("user"));
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(
    getConfig("editRegularSavings") + data.id + "?token=" + user.token,
    requestOptions
  ).then(handleResponse);
}
function withdrawRegularSavings(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("withdrawRegularSavings"), requestOptions).then(
    handleResponse
  );
}
function deactivateAutoSave() {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    // body: JSON.stringify(data),
  };
  return fetch(
    getConfig("deactivateAutoSave"), requestOptions).then(handleResponse);
}

function deactivateAutoSaveLoan() {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    // body: JSON.stringify(data),
  };
  return fetch(
    getConfig("deactivateAutoSaveLoan"), requestOptions).then(handleResponse);
}

// save to loan savings methods
function addFundSaveToLoanSavings(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("addFundSaveToLoanSavings"), requestOptions).then(
    handleResponse
  );
}
function createSaveToLoanSavings(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("saveSaveToLoanSavings"), requestOptions).then(
    handleResponse
  );
}
function editSaveToLoanSavings(data) {
  let user = JSON.parse(localStorage.getItem("user"));
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(
    getConfig("editSaveToLoanSavings"),
    requestOptions
  ).then(handleResponse);
}

function exitLoanSavings(id) {
  let user = JSON.parse(localStorage.getItem("user"));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    // body: JSON.stringify(data),
  };
  return fetch(
    getConfig("exitLoanSavings")+id+"?token="+user.token, requestOptions ).then(handleResponse);
}

// create loan group
function createLoanGroup(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("createLoanGroup"), requestOptions ).then(handleResponse);
}

// create loan
function createLoan(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("createLoan"), requestOptions ).then(handleResponse);
}

// accept loan
function acceptLoan(group_id, loan_id) {
  let user = JSON.parse(localStorage.getItem("user"));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    // body: JSON.stringify(data),
  };
  return fetch(getConfig("acceptLoan")+group_id+"/"+loan_id+"?token="+user.token, requestOptions ).then(handleResponse);
}

// decline loan
function declineLoan(group_id, loan_id) {
  let user = JSON.parse(localStorage.getItem("user"));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    // body: JSON.stringify(id),
  };
  return fetch(getConfig("declineLoan")+group_id+"/"+loan_id+"?token="+user.token, requestOptions ).then(handleResponse);
}

// Join group loan
function joinGroup(email, code) {
  let user = JSON.parse(localStorage.getItem("user"));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({email, code}),
  };
  return fetch(getConfig("joinGroup"), requestOptions ).then(handleResponse);
}

// Reject group loan
function rejectGroup(id) {
  let user = JSON.parse(localStorage.getItem("user"));
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    // body: JSON.stringify(data),
  };
  return fetch(getConfig("rejectGroup")+id+"?token="+user.token, requestOptions ).then(handleResponse);
}

// Exit group loan
function exitGroup(id) {
  let user = JSON.parse(localStorage.getItem("user"));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  return fetch(getConfig("exitGroup")+id+"?token="+user.token, requestOptions ).then(handleResponse);
}

// Repay Loan group loan
function addLoanRepayment(data) {
  let user = JSON.parse(localStorage.getItem("user"));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("addLoanRepayment")+data.id+"?token="+user.token, requestOptions ).then(handleResponse);
}

// Resend loan group Notification
function resendGroupNotification(id) {
  let user = JSON.parse(localStorage.getItem("user"));
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    // body: JSON.stringify(data),
  };
  return fetch(getConfig("resendGroupNotification")+id+"?token="+user.token, requestOptions ).then(handleResponse);
}

// Resend loan Notification
function resendLoanNotification(loan_group, user_id) {
  let user = JSON.parse(localStorage.getItem("user"));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    // body: JSON.stringify(data),
  };
  return fetch(getConfig("resendLoanNotification")+loan_group+"/"+user_id+"?token="+user.token, requestOptions ).then(handleResponse);
}

// Replace gruop member
function replaceMember(data) {
  let user = JSON.parse(localStorage.getItem("user"));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("replaceMember")+data.request_id+"?token="+user.token, requestOptions ).then(handleResponse);
}

// Remove gruop member
function removeMember(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("removeMember"), requestOptions ).then(handleResponse);
}

function withdrawSaveToLoanSavings(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("withdrawSaveToLoanSavings"), requestOptions).then(
    handleResponse
  );
}

// taget savings methods
function addFundTargetSavings(data) {
  let user = JSON.parse(localStorage.getItem("user"));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(
    getConfig("addFundTargetSavings") + data.id + "?token=" + user.token,
    requestOptions
  ).then(handleResponse);
}

function createTargetSavings(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("saveTargetSavings"), requestOptions).then(
    handleResponse
  );
}

function editTargetSavings(data) {
  let user = JSON.parse(localStorage.getItem("user"));
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(
    getConfig("editTargetSavings") + data.id + "?token=" + user.token,
    requestOptions
  ).then(handleResponse);
}

function exitTargetSavings(id) {
  let user = JSON.parse(localStorage.getItem("user"));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    // body: JSON.stringify(data),
  };
  return fetch( getConfig("exitTargetSavings") + id + "?token=" + user.token, requestOptions ).then(handleResponse);
}

function withdrawTargetSavings(data) {
  let user = JSON.parse(localStorage.getItem("user"));
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(
    getConfig("withdrawTargetSavings") + data.id + "?token=" + user.token,
    requestOptions
  ).then(handleResponse);
}

// other transactions
function saveInvestment(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("saveInvestment"), requestOptions).then(
    handleResponse
  );
}

function getInvestments() {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  return fetch(getConfig("getInvestments"), requestOptions).then(
    handleResponse
  );
}

function getSingleInvestment(id) {
  let user = JSON.parse(localStorage.getItem("user"));
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  return fetch(
    getConfig("getSingleInvestment") + id + "?token=" + user.token,
    requestOptions
  ).then(handleResponse);
}

function addMarketPlace(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("addMarketPlace"), requestOptions).then(
    handleResponse
  );
}

// wallet savings methods
function saveWallet(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("saveWallet"), requestOptions).then(
    handleResponse
  );
}

// update users cards
function updateBank(data) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("updateBank"), requestOptions).then(
    handleResponse
  );
}

// save users cards
function saveBank(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("saveBank"), requestOptions).then(
    handleResponse
  );
}

// wallet withdraw methods
function saveWithdrawal(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("saveWithdrawal"), requestOptions).then(
    handleResponse
  );
}

// Halai investment

function saveHalaiInvestment(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("saveHalaiInvestment"), requestOptions).then(
    handleResponse
  );
}

function getHalaiNews() {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  return fetch(getConfig("getHalaiNews"), requestOptions).then(handleResponse);
}

function getSingleHalai(id) {
  let user = JSON.parse(localStorage.getItem("user"));
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  return fetch(
    getConfig("getSingleHalai") + id + "?token=" + user.token,
    requestOptions
  ).then(handleResponse);
}

function addHalaiInvestors(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("addHalaiInvestors"), requestOptions).then(
    handleResponse
  );
}

// end halai investment

// add profile
function addProfile(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("addProfile"), requestOptions).then(handleResponse);
}

// update profile
function updateProfile(data) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("updateProfile"), requestOptions).then(async (response)=>{
    const data = await response.json();
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
      localStorage.setItem("name", data.first_name + " "+ data.last_name);
      localStorage.setItem("email", data.email);
      localStorage.setItem("profile_pic", data.profile_pic);
    console.log(data)
    return data;
  }).catch(error => {
    if (error === "Unauthorized") {
      history.push("/login");
    }
    console.log(error)
  })
}
// update picture
function updatePicture(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader()},
    body:data
  };
  return fetch(getConfig("updatePicture"), requestOptions).then(async (response)=>{
    const data = await response.json();
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      if (error === "Unauthorized") {
        history.push("/login");
      }
      return Promise.reject(error);
    }
    localStorage.setItem("profile_pic", data.profile_pic);
    return data;
  })
}

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("name");
  localStorage.removeItem("email");
  // localStorage.setItem("lasturl", "");
}

function relogin(email) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(email),
  };

  return fetch(getConfig("relogin"), requestOptions)
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(getConfig("signup"), requestOptions).then(handleResponse);
}

function lostpassword(email) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: email,
  };

  return fetch(getConfig("recoverpass"), requestOptions).then(handleResponse);
}

function resetpassword(user) {
  const requestOptions = {
    method: "POST",
    headers: {...authHeader, "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(getConfig("resetPass"), requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`{config.apiUrl}/users/${user.id}`, requestOptions).then(
    handleResponse
  );
}

function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`{config.apiUrl}/users/${id}`, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  return response.text().then((text) => {
    let data = "";
    try {
      data = text && JSON.parse(text);
    } catch (error1) {
      // ...
    }
    if (!response.ok) {
      /**  if (response.status === 401) {
               //JWT token has expired here
                relogin(localStorage.getItem('email'));
              //  window.location.reload(true);
              logout();
              history.push('/login');

            }
           */

      const error = (data && data.message) || response.statusText;
      if (error === "Unauthorized") {
        history.push("/signin");
      }
      return Promise.reject(error);
    }

    return data;
  });
}
