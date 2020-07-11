import { userConstants } from "../_constants";
import { userService } from "../../services/user.service";
import { alertActions } from "../actions/alert.actions";
import history  from "../../../history";

export const userActions = {
  login,
  logout,
  register,
  lostpassword,
  resetpassword,
  createRegularSavings,
  withdrawRegularSavings,
  addFundRegularSavings,
  editRegularSavings,

  createTargetSavings,
  withdrawTargetSavings,
  addFundTargetSavings,
  editTargetSavings,
  exitTargetSavings,

  createSaveToLoanSavings,
  withdrawSaveToLoanSavings,
  addFundSaveToLoanSavings,
  editSaveToLoanSavings,
  exitLoanSavings,

  // create loan group
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

  addProfile,
  updateProfile,
  updatePicture,
  deactivateAutoSave,
  deactivateAutoSaveLoan,
};

function login(username, password) {
  return (dispatch) => {
    dispatch(request({ username }));
    let email = localStorage.getItem('email')
    userService.login(username, password).then(
      (user) => {
        if(user.status == true){
          dispatch(success(user));
          let lasturl = localStorage.getItem('lasturl')
          if(lasturl != "" || lasturl != null){
            if(email =="" || email == null){
              history.push({
                pathname: "/"
              });
            }else{
              history.push({
                pathname: "/"
              });
            }
          }else{  
            history.push({
              pathname: "/"
            });
          }
        }else{
          dispatch(alertActions.error(user.message));
          dispatch(failure(user.message))
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        if(error.toString() == "Invalid Email or Password"){
          dispatch(alertActions.error( "Invalid Email or Password"));
        }else{
          dispatch(alertActions.error("Internet Error, Please check your internet and try again"));
        }
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  history.push({
    pathname: "/signin"
  });
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (user) => {
        dispatch(success());
        history.push("/signin");
        dispatch(alertActions.success("Registration successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        if(error.toString() == "Internal Server Error"){
          dispatch(alertActions.error( user.email+" has already been used "));
        }else{
          dispatch(alertActions.error("Internet Error, Please check your internet and try again"));
        }
        
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

// Regular savings actions
function createRegularSavings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.createRegularSavings(user).then(
      (user) => {
        dispatch(success());
        history.push("/savings/regular");
        dispatch(alertActions.success("Create Regular savings successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function withdrawRegularSavings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.withdrawRegularSavings(user).then(
      (user) => {
        dispatch(success());
        history.push("/savings/regular");
        dispatch(alertActions.success("Withdraw savings successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function addFundRegularSavings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.addFundRegularSavings(user).then(
      (user) => {
        dispatch(success());
        history.push("/savings/regular");
        dispatch(
          alertActions.success("Add fund to regular savings successful")
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function editRegularSavings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.editRegularSavings(user).then(
      (user) => {
        dispatch(success());
        history.push("/savings/regular");
        dispatch(alertActions.success("Regular Savings Successfully Updated"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function deactivateAutoSaveLoan(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.deactivateAutoSaveLoan(user).then(
      (user) => {
        dispatch(success());
        dispatch(
          alertActions.success("Auto save Deactivated")
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}
function deactivateAutoSave(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.deactivateAutoSave(user).then(
      (user) => {
        dispatch(success());
        dispatch(
          alertActions.success("Auto save Deactivated")
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

// Save to loan savings actions
function createSaveToLoanSavings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.createSaveToLoanSavings(user).then(
      (user) => {
        dispatch(success());
        history.push("/savings/savetoloan");
        dispatch(
          alertActions.success("Save to Loan Savings Created Successfully")
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function withdrawSaveToLoanSavings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.withdrawSaveToLoanSavings(user).then(
      (user) => {
        dispatch(success());
        history.push("/savings/savetoloan");
        dispatch(alertActions.success("Withdrawal made successfully"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function addFundSaveToLoanSavings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.addFundSaveToLoanSavings(user).then(
      (user) => {
        dispatch(success());
        history.push("/savings/savetoloan");
        dispatch(
          alertActions.success(
            "Funds added to Save to Loan savings Successfully"
          )
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function editSaveToLoanSavings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.editSaveToLoanSavings(user).then(
      (user) => {
        dispatch(success());
        history.push("/savings/savetoloan");
        dispatch(
          alertActions.success("Save to Loan savings Updated Successfully")
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function exitLoanSavings(loan_id) {
  return (dispatch) => {
    dispatch(request(loan_id));

    userService.exitLoanSavings(loan_id).then(
      (user) => {
        dispatch(success());
        history.push("/savings/savetoloan");
        dispatch(
          alertActions.success("You have successfully exit your Loan Savings")
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
        window.location.reload();
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

// create loan group action
function createLoanGroup(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.createLoanGroup(user).then(
      (user) => {
        dispatch(success());
        history.push("/loan");
        dispatch(
          alertActions.success(" Loan Group Created Successfully")
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

// create loan action
function createLoan(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.createLoan(user).then(
      (user) => {
        dispatch(success());
        history.push("/loan");
        dispatch(
          alertActions.success("You Loan Application is Successfull")
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

// accept loan
function acceptLoan(group_id, loan_id) {
  return (dispatch) => {
    dispatch(request(group_id));

    userService.acceptLoan(group_id, loan_id).then(
      (user) => {
        dispatch(success());
        history.push("/loan");
        dispatch(
          alertActions.success("Loan Accepted Successfully")
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
        window.location.reload();
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

// decline loan
function declineLoan(group_id, loan_id) {
  return (dispatch) => {
    dispatch(request(group_id));

    userService.declineLoan(group_id, loan_id).then(
      (user) => {
        dispatch(success());
        history.push("/loan");
        dispatch(
          alertActions.success("Loan declined successfully")
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
        window.location.reload();
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

// join loan group
function joinGroup(email, code) {
  return (dispatch) => {
    dispatch(request(email));

    userService.joinGroup(email, code).then(
      (user) => {
        dispatch(success());
        history.push("/loan");
        dispatch(
          alertActions.success("You joined loan group Successfully")
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
        // window.location.reload();
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

// reject loan group
function rejectGroup(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.rejectGroup(user).then(
      (user) => {
        dispatch(success());
        history.push("/loan");
        dispatch(
          alertActions.success("You reject loan group Successfully")
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
        window.location.reload();
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

// exit loan group
function exitGroup() {
  return (dispatch) => {
    dispatch(request());

    userService.exitGroup().then(
      (user) => {
        dispatch(success());
        history.push("/loan");
        dispatch(
          alertActions.success("You exit loan group Successfully")
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
        window.location.reload();
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

// add loan repayment
function addLoanRepayment(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.addLoanRepayment(user).then(
      (user) => {
        dispatch(success());
        history.push("/loan");
        dispatch(
          alertActions.success("Loan paid successfully")
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

// resend group notification 
function resendGroupNotification(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.resendGroupNotification(user).then(
      (user) => {
        dispatch(success());
        dispatch(
          alertActions.success("Group Notification sent successfully")
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

// resend loan notification 
function resendLoanNotification(loan_group, user_id) {
  return (dispatch) => {
    userService.resendLoanNotification(loan_group, user_id).then(
      (user) => {
        dispatch(success());
        dispatch(
          alertActions.success("Loan Notification sent successfully")
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

// replace group member 
function replaceMember(user) {
  return (dispatch) => {
    dispatch(request(user));
    userService.replaceMember(user).then(
      (user) => {
        dispatch(success());
        dispatch(
          alertActions.success("Group Member has been replaced")
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

// remove group member 
function removeMember(user) {
  return (dispatch) => {
    dispatch(request(user));
    userService.removeMember(user).then(
      (user) => {
        dispatch(success());
        dispatch(
          alertActions.success("Group Member has been replaced")
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}


// Target savings actions
function createTargetSavings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.createTargetSavings(user).then(
      (user) => {
        dispatch(success());
        history.push("/savings/target");
        dispatch(alertActions.success("Target savings successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function withdrawTargetSavings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.withdrawTargetSavings(user).then(
      (user) => {
        dispatch(success());
        history.push("/savings/target");
        dispatch(alertActions.success("Withdraw savings successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function addFundTargetSavings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.addFundTargetSavings(user).then(
      (user) => {
        dispatch(success());
        history.push("/savings/target");
        dispatch(alertActions.success("Fund successful add to savings"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function editTargetSavings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.editTargetSavings(user).then(
      (user) => {
        dispatch(success());
        history.push("/savings/target");
        dispatch(alertActions.success("Target savings updated successfully"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function exitTargetSavings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.exitTargetSavings(user).then(
      (user) => {
        dispatch(success());
        history.push("/savings/target");
        dispatch(alertActions.success("Target savings updated successfully"));
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

// Other transactions action method
function saveInvestment(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.saveInvestment(user).then(
      (user) => {
        dispatch(success());
        history.push("/investment/halalfinancing");
        dispatch(alertActions.success("Investment saved successfully"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function getInvestments() {
  return (dispatch) => {
    dispatch(request());

    userService.getInvestments().then(
      (user) => {
        dispatch(success());
        // history.push('/');
        dispatch(alertActions.success("all investment news fetched"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: userConstants.SAVINGS_REQUEST };
  }
  function success() {
    return { type: userConstants.SAVINGS_SUCCESS };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function getSingleInvestment(id) {
  return (dispatch) => {
    dispatch(request());

    userService.getSingleInvestment(id).then(
      (user) => {
        dispatch(success());
        history.push("/");
        dispatch(alertActions.success("details of single investment"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function addMarketPlace(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.addMarketPlace(user).then(
      (user) => {
        dispatch(success());
        history.push("/investments/marketview");
        dispatch(
          alertActions.success("investment added to the market successfully")
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

// halai investment

function saveHalaiInvestment(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.saveHalaiInvestment(user).then(
      (user) => {
        dispatch(success());
        history.push("/");
        dispatch(alertActions.success("Investment saved successfully"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function getHalaiNews() {
  return (dispatch) => {
    dispatch(request());

    userService.getHalaiNews().then(
      (user) => {
        dispatch(success());
        // history.push('/');
        dispatch(alertActions.success("all investment news fetched"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: userConstants.SAVINGS_REQUEST };
  }
  function success() {
    return { type: userConstants.SAVINGS_SUCCESS };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function getSingleHalai(id) {
  return (dispatch) => {
    dispatch(request());

    userService.getSingleHalai(id).then(
      (user) => {
        dispatch(success());
        history.push("/");
        dispatch(alertActions.success("details of single investment"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function addHalaiInvestors(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.addHalaiInvestors(user).then(
      (user) => {
        dispatch(success());
        history.push("/investments/halalfinancing");
        dispatch(
          alertActions.success("investment added to the market successfully")
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

// end halai investment

function saveWallet(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.saveWallet(user).then(
      (user) => {
        dispatch(success());
        history.push("/wallet");
        dispatch(
          alertActions.success("Money saved to wallet successfully")
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
        window.location.reload();
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function saveBank(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.saveBank(user).then(
      (user) => {
        dispatch(success());
        history.push("/settings");
        dispatch(
          alertActions.success("Bank details saved successfully")
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function updateBank(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.updateBank(user).then(
      (user) => {
        dispatch(success());
        history.push("/settings");
        dispatch(
          alertActions.success("Bank details updated successfully")
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function saveWithdrawal(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.saveWithdrawal(user).then(
      (user) => {
        dispatch(success());
        history.push("/wallet");
        dispatch(
          alertActions.success("save withdrawal successfully")
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function addProfile(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.addProfile(user).then(
      (user) => {
        dispatch(success());
        history.push("/profile");
        dispatch(alertActions.success("Profile updated successfully"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function updateProfile(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.updateProfile(user).then(
      (user) => {
        dispatch(success());
        history.push("/profile");
        dispatch(alertActions.success("Profile updated successfully"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function updatePicture(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.updatePicture(user).then(
      (user) => {
        console.log("result:"+user)
        dispatch(success());
        history.push("/profile");
        dispatch(alertActions.success("Profile picture updated successfully"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function lostpassword(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.lostpassword(user).then(
      (user) => {
        dispatch(success());
        history.push("/recoverysuccess");
        dispatch(alertActions.success("Password recovered successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function resetpassword(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.resetpassword(user).then(
      (user) => {
        dispatch(success());
        history.push("/dashboard");
        dispatch(alertActions.success("Password reset successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}
