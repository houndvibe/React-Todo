import { useGetTodosQuery } from "../redux/todoApiSlice";
import { todoListViewParamsProps, todoProps } from "../types";
import TodoList from "../components/todos/TodoList";
import TodoStaticPannel from "../components/todos/TodoStaticPannel";
import { useAllAboutUsers } from "../hooks/useAllAboutUsers";
import { useState } from "react";

const UserPage: React.FC = () => {
  const { currentUser } = useAllAboutUsers();

  const [todoListViewParams, setTodoListViewParams] =
    useState<todoListViewParamsProps>({
      filterType: "all",
      sortType: "newFirst",
    });

  const {
    data: todos,
    isLoading: isTodosLoading,
    error: todosError,
  } = useGetTodosQuery(undefined);

  const handleChangeViewParams = (type: string, value: string): void => {
    setTodoListViewParams({ ...todoListViewParams, [type + "Type"]: value });
  };

  const currentUserTodos: todoProps[] = todos
    ? todos.filter((todo: todoProps) => todo.userId == currentUser?.id)
    : [];

  return (
    <div>
      <TodoStaticPannel handleChangeViewParams={handleChangeViewParams} />
      <div>
        {todosError ? (
          <>Oh no, there was an error</>
        ) : isTodosLoading ? (
          <div className="mt-2 flex h-full items-center justify-center rounded-md bg-red text-white">
            Loading...
          </div>
        ) : todos ? (
          todos.length ? (
            <div>
              <div className="mt-2 text-2xl">
                <span className="text-4xl">{`${currentUser?.nickName || "New user"}'s`}</span>{" "}
                <span>tasks:</span>
              </div>
              <div>
                <TodoList
                  currentUserTodos={currentUserTodos}
                  viewParams={todoListViewParams}
                />
              </div>
            </div>
          ) : (
            <div className="mt-2 flex w-full items-center justify-center rounded-md bg-red p-10 text-7xl text-white">
              <span className="text-center">{`^ add you first todo`}</span>
            </div>
          )
        ) : (
          <>No active User</>
        )}
      </div>
    </div>
  );
};

export default UserPage;
