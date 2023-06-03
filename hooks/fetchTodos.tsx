import React, { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'

type Todo = {
  [key: string]: string;
}

type FetchTodosResult = {
  loading: boolean;
  error: string | null;
  todos: Todo | null;
  setTodos: React.Dispatch<React.SetStateAction<Todo | null>>;
}

export default function useFetchTodos(): FetchTodosResult {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [todos, setTodos] = useState<Todo | null>(null)

  const { currentUser } = useAuth()

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, 'users', currentUser.uid)
        const docSnap = await getDoc(docRef)
        const nombre = "nombre"
        if (docSnap.exists()) {
          console.log(docSnap.data().nombre[1])
          console.log(docSnap.data().nombre[1])
          setTodos(docSnap.data().todos as Todo)
        } else {
          setTodos({})
        }
      } catch (err) {
        setError('Failed to load todos')
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { loading, error, todos, setTodos }
}