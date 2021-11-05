//Notes Action Types

//Notes List Action Type

export interface listApiData {
  id: number;
  title: string;
  content: string;
  category: string;
  user: string;
}

export type noteAction = {
  type: string;
  payload?: listApiData | string | unknown;
};

export type dispatchType = (args: noteAction) => noteAction;

//Notes Create Action Type

export interface createData {
  title: string;
  content: string;
  category: string;
}
export type createAction = {
  type: string;
  payload?: createData | string;
};
export type createDispatch = (args: createAction) => createAction;

//Notes Delete Action Type

export interface deleteAction {
  type: string;
  payload?: string;
}
export type dispatchDelete = (args: deleteAction) => deleteAction;

//Notes Update Action Type

export interface updateData {
  id?: string | undefined;
  title: string;
  content: string;
  category: string;
}
export type updateAction = {
  type: string;
  payload?: updateData | string;
};
export type dispatchUpdate = (args: updateAction) => updateAction;

//User Action Types

//Login Action Type

export interface loginData {
  email: string;
  password: string;
}
export interface loginApiData {
  id: number;
  name: string;
  email: string;
  isAdmin: Boolean;
  token: string;
}
export type loginAction = {
  type: string;
  payload?: loginApiData;
};
export type dispatchLogin = (args: loginAction) => loginAction;

//Logout Action Type

export interface logoutAction {
  type: string;
}
export type dispatchLogout = (args: logoutAction) => logoutAction;

//Register Action Type

export interface registerData {
  name: string;
  email: string;
  password: string;
}
export interface registerApiData {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}
export type registerAction = {
  type: string;
  payload?: registerApiData | string;
};

//Update Action Type

export type updateUserApiData = {
  _id: number;
  name: string;
  email: string;
  token: string;
};
export type updateUserData = {
  name: string;
  email: string;
  password: string;
};
export type updateUserAction = {
  type: string;
  payload?: updateUserApiData;
};


//My Notes Screen Types

//noteList type

export interface allNotes{
  title:string;
  content:string;
  category:string;
  user:string;
}
export interface noteListData{
  loading:boolean;
  notes:allNotes[]
  error:string
}
