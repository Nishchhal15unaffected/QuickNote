import axios from "axios";
import {
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
  NOTES_LIST_FAIL,
  NOTES_CREATE_REQUEST,
  NOTES_CREATE_SUCCESS,
  NOTES_CREATE_FAIL,
  NOTES_UPDATE_REQUEST,
  NOTES_UPDATE_SUCCESS,
  NOTES_UPDATE_FAIL,
  NOTES_DELETE_REQUEST,
  NOTES_DELETE_SUCCESS,
  NOTES_DELETE_FAIL,
} from "../constants/noteConstants";
import {
  createData,
  createDispatch,
  dispatchDelete,
  dispatchType,
  dispatchUpdate,
  updateData,
} from "../Type/Type";
export const listNotes =
  () => async (dispatch: dispatchType, getState: any) => {
    try {
      dispatch({
        type: NOTES_LIST_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get("/api/notes", config);

      dispatch({
        type: NOTES_LIST_SUCCESS,
        payload: data,
      });
    } catch (err: any) {
      const message: string =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      dispatch({
        type: NOTES_LIST_FAIL,
        payload: message,
      });
    }
  };

export const createNoteAction =
  ({ title, content, category }: createData) =>
  async (dispatch: createDispatch, getState: any) => {
    try {
      dispatch({
        type: NOTES_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post<createData>(
        "/api/notes/create",
        { title, content, category },
        config
      );
      dispatch({
        type: NOTES_CREATE_SUCCESS,
        payload: data,
      });
    } catch (err: any) {
      const message: string =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      dispatch({
        type: NOTES_CREATE_FAIL,
        payload: message,
      });
    }
  };
export const deleteNoteAction =
  (id: string | undefined) => async (dispatch: dispatchDelete, getState: any) => {
    try {
      dispatch({
        type: NOTES_DELETE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.delete<string>(`/api/notes/${id}`, config);

      dispatch({
        type: NOTES_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: NOTES_DELETE_FAIL,
        payload: message,
      });
    }
  };

export const updateNoteAction =
  ({ id, title, content, category }: updateData) =>
  async (dispatch: dispatchUpdate, getState: any) => {
    try {
      dispatch({
        type: NOTES_UPDATE_REQUEST,
      });
    console.log(id);
      const {
        userLogin: { userInfo },
      } = getState();
      console.log(id)
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      
      console.log(id)
      const { data } = await axios.put<updateData>(
        `/api/notes/${id}`,
        { title, content, category },
        config
      );

      dispatch({
        type: NOTES_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      const message: string =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: NOTES_UPDATE_FAIL,
        payload: message,
      });
    }
  };
