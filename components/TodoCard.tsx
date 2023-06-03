import React, { ChangeEvent } from 'react';

type TodoCardProps = {
  children: React.ReactNode;
  edit: string | null;
  handleAddEdit: (todoKey: string) => () => void;
  edittedValue: string;
  setEdittedValue: (value: string) => void;
  todoKey: string;
  handleEditTodo: () => void;
  handleDelete: (todoKey: string) => () => void;
};

export default function TodoCard(props: TodoCardProps) {
  const { children, edit, handleAddEdit, edittedValue, setEdittedValue, todoKey, handleEditTodo, handleDelete } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEdittedValue(e.target.value);
  };

  return (
    <div className='p-2 relative sm:p-3 border flex items-stretch border-white border-solid'>
      <div className='flex-1 flex'>
        {!(edit === todoKey) ? (
          <>{children}</>
        ) : (
          <input className='bg-inherit flex-1 text-white outline-none' value={edittedValue} onChange={handleChange} />
        )}
      </div>
      <div className='flex items-center'>
        {edit === todoKey ? (
          <i onClick={handleEditTodo} className='fa-solid fa-check px-2 duration-300 hover:scale-125 cursor-pointer'></i>
        ) : (
          <i onClick={handleAddEdit(todoKey)} className='fa-solid fa-pencil px-2 duration-300 hover:rotate-45 cursor-pointer'></i>
        )}
        <i onClick={handleDelete(todoKey)} className='fa-solid fa-trash-can px-2 duration-300 hover:scale-125 cursor-pointer'></i>
      </div>
    </div>
  );
}