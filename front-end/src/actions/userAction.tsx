import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../constants/userConstants";
import { dispatchLogin, dispatchLogout, loginApiData, loginData, registerAction, registerApiData, registerData, updateUserAction, updateUserApiData, updateUserData } from '../Type/Type'

export const login =
  ({ email, password }: loginData) =>
  async (dispatch: dispatchLogin) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post<loginApiData>(
        "api/users/login",
        {
          email,
          password,
        },
        config
      );
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err: any) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const logout = () => async (dispatch: dispatchLogout) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

type dispatchRegister = (args: registerAction) => registerAction;
export const register =
  ({ name, email, password }: registerData) =>
  async (dispatch: dispatchRegister) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post<registerApiData>(
        "api/users",
        { name, email, password },
        config
      );
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err: any) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

type dispatchUpdate = (args: updateUserAction) => void;
export const updateProfile =
  (user: updateUserData) => async (dispatch: dispatchUpdate, getState: any) => {
    try {
      dispatch({
        type: USER_UPDATE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post<updateUserApiData>(
        "/api/users/profile",
        user,
        config
      );
      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: data,
      });

      //for all of the our data will be update
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err: any) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
