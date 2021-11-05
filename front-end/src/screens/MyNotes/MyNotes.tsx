import { Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../component/MainScreen";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/noteAction";
import ErrorMessage from "../../component/ErrorMessage";
import Loading from "../../component/Loading";
import { useHistory } from "react-router";
import {RootState} from '../../store'
import {noteListData} from '../../Type/Type'
interface Props{
  search:string
}

const MyNotes:React.FC <Props> = ({ search }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const noteList = useSelector((state:RootState) => state.noteList);
  const { loading, notes, error }:noteListData = noteList;

  const noteDelete = useSelector((state:RootState) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  }:any= noteDelete;
  const deleteHandler = (id:string) => {
    if (window.confirm("Are you sure? you want to delete note")) {
      dispatch(deleteNoteAction(id));
    }
  };
  const userLogin = useSelector((state:RootState) => state.userLogin);
  const { userInfo }:any= userLogin;

  const noteCreate = useSelector((state:RootState) => state.noteCreate);
  const { success: successCreate }:any = noteCreate;

  const noteUpdate = useSelector((state:RootState) => state.noteUpdate);
  const { success: successUpdate }:any = noteUpdate;
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
            size="lg"
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
          .filter((filterNote:any) =>
            filterNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((note:any) => {
            return (
              <Card style={{ margin: 10 }} key={note._id}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      textDecoration: "none",
                      flex: 1,
                      alignSelf: "center",
                      fontSize: 18,
                    }as React.CSSProperties}
                  >
                    {note.title}
                  </span>
                  <Link to={`/editnote/${note._id}`}>
                  <Button
                    variant="outline-info"
                    className="mx-2 "
                    style={{ align: "right" }as React.CSSProperties}
                    size="sm"
                  >
                    Edit
                  </Button>
                  </Link>
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
