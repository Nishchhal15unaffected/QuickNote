import React, {  useState } from "react";
import MainScreen from "../../component/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, updateNoteAction } from "../../actions/noteAction";
import ErrorMessage from "../../component/ErrorMessage";
import Loading from "../../component/Loading";
import ReactMarkdown from "react-markdown";
import {RootState} from '../../store'
import { RouteComponentProps,useHistory } from 'react-router';
interface MatchParams {
  id: string;
}
interface Props extends RouteComponentProps<MatchParams> {
}
const SingleNote: React.FC<Props> = ({ match}) => {
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const [category, setCategory] = useState<string | undefined>();
  const history= useHistory()
  const dispatch = useDispatch();

  const noteUpdate = useSelector((state:RootState) => state.noteUpdate);
  const { loading, error }:any = noteUpdate;

  const noteDelete = useSelector((state:RootState) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete }:any = noteDelete;

  const deleteHandler = (id: string ) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
    history.push("/mynotes");
  };


  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    const id=match.params.id;
    dispatch(updateNoteAction({id, title, content, category}));

    resetHandler();
    history.push("/mynotes");
  };

  return (
    <MainScreen title="EDIT NOTE">
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading />}
            <Button variant="outline-danger" className="my-3" type="submit">
              Update Note
            </Button>
            <Button
              className="mx-2"
              variant="outline-warning"
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete Note
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </MainScreen>
  );
};

export default SingleNote;
