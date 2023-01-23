import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Alert } from "antd";
import Button from "antd/es/button";
import axios from "axios";
import Cookies from "js-cookie";
import SkeletonList from "../components/SkeletonList";

const Homepage: FC = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTextValidate, setIsTextValidate] = useState<boolean>(false);
  const [todos, setTodos] = useState<[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [todo, setTodo] = useState<string>("");

  const getAllTodos = async () => {
    axios(process.env.REACT_APP_TODOS as string, {
      headers: { Authorization: "Bearer " + Cookies.get("blabla") },
    })
      .then((res) => {
        setTodos(res.data.data);
      })
      .catch((err) => {
        if (err.response.status) {
          setErrorMessage("Internal Server Error");
        }
      });
  };

  const addTodo = async () => {
    setIsLoading(true);
    axios
      .post(
        process.env.REACT_APP_TODOS as string,
        { todos: todo },
        { headers: { Authorization: "Bearer " + Cookies.get("blabla") } }
      )
      .then(() => {
        setTodo("");
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status) {
          setErrorMessage("Internal Server Error");
          setIsLoading(false);
          setIsTextValidate(true);
        }
      });
  };

  const handleDelete = async (id: number) => {
    axios.delete(process.env.REACT_APP_TODOS as string + `/${id}`, {
      headers: { Authorization: "Bearer " + Cookies.get("blabla") },
    })
  };

  const handelLogout = () => {
    Cookies.remove("blabla");
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  useEffect(() => {
    getAllTodos();
  }, [isLoading]);

  return (
    <div className="home-container">
      <Button
        style={{ marginBottom: "1rem" }}
        onClick={handelLogout}
      >
        Logout
      </Button>
      <Input.Group compact>
        <Input
          style={{ maxWidth: "calc(70%)" }}
          status={isTextValidate ? "error" : ""}
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
            setIsTextValidate(false);
          }}
          placeholder={isTextValidate ? "Please Fill" : "Type to add"}
        />
        <Button
          type="primary"
          onClick={addTodo}
          loading={isLoading}
          style={{ width: "calc(30%)" }}
        >
          Submit
        </Button>
      </Input.Group>
      <div className="list-container">
        {todos.length === 0 
          ? "Belum ada todo"
          : todos.map((todo: any, i) => {
              return (
                <Alert
                  key={i}
                  message={todo.todo}
                  style={{ marginTop: "0.5rem" }}
                  closable
                  onClick={() => handleDelete(todo.id)}
                />
              );
            })}
      </div>
    </div>
  );
};

export default Homepage;
