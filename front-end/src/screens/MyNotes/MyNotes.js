import axios from "axios";
import { Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../component/MainScreen";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/noteAction";
import ErrorMessage from "../../component/ErrorMessage";
import Loading from "../../component/Loading";
import { useHistory } from "react-router";
const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure? you want to delete note")) {
      dispatch(deleteNoteAction(id));
    }
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    userInfo,
    successCreate,
    successUpdate,
    successDelete,
    history,
  ]);

  return (
    <div>
      <MainScreen title={`Welcome Back ${userInfo.name}`}>
        <Link to="/createnote">
          <Button
            style={{ marginLeft: 10, marginBottom: 6 }}
            size="md"
            variant="outline-danger"
          >
            Create New Note
          </Button>
        </Link>
        {errorDelete && (
          <ErrorMessage variant="warning">{errorDelete}</ErrorMessage>
        )}
        {loadingDelete && <Loading />}
        {error && <ErrorMessage variant="warning">{error}</ErrorMessage>}
        {loading && <Loading />}
        {notes
          ?.reverse()
          .filter((filterNote) =>
            filterNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((note) => {
            return (
              <Card style={{ margin: 10 }} key={note._id}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      textDecoration: "none",
                      flex: 1,
                      cursor: PointerEvent,
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    {note.title}
                  </span>
                  <Button
                    href={`/editnote/${note._id}`}
                    variant="outline-info"
                    className="mx-2 "
                    style={{ align: "right" }}
                    size="sm"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-warning"
                    className="mx-2"
                    size="sm"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </Card.Header>
                <Card.Body>
                  <h6>
                    <Badge>Category:-{note.category}</Badge>
                  </h6>
                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
                    <footer className="blockquote-footer">
                      Created on - {note.createdAt.substring(0, 10)}
                    </footer>
                  </blockquote>
                </Card.Body>
              </Card>
            );
          })}
      </MainScreen>
    </div>
  );
};
export default MyNotes;
