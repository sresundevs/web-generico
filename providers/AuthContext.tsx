import { jwtVerify } from 'jose'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'

import { User } from '@/interfaces/Users.interface'
import { message } from 'antd'

type typeAuthContext = {
  user: User
  isAuthenticated: boolean
  login: (token: string) => void
  loading: boolean
  logout: () => void
  setLoading: Dispatch<SetStateAction<boolean>>
  setSpinning: Dispatch<SetStateAction<boolean>>
  spinning: boolean
}

const AuthContext = React.createContext<typeAuthContext>({} as typeAuthContext)

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const router = useRouter()

  const [user, setUser] = useState<User>({} as User)

  const [loading, setLoading] = useState<boolean>(true)
  const [spinning, setSpinning] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    setLoading(true)

    if (Cookies.get('authToken') !== undefined) {
      const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_KEY)
      const data = (await jwtVerify(Cookies.get('authToken')?.toString() || '', secret)).payload as { data: User; exp: number }
      const user = data.data
      setUser(user)
    } else {
      if (!router.pathname.includes('session')) {
        router.push('/session')
      }
    }
    setLoading(false)
  }

  const login = async (token: string) => {
    try {
      console.log(process.env.NEXT_PUBLIC_SECRET_KEY)
      const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_KEY)
      
      const data = (await jwtVerify(token, secret, {algorithms:['HS256']})).payload as { data: User; exp: number }

      console.log(data)

      const user = data.data
      setUser(user)
      Cookies.set('authToken', token, { expires: new Date((data as any).exp * 1000) })
      setSpinning(false)
      setLoading(false)
      router.push('/')
    } catch (error) {
      console.error(error)
      message.error('Invalid credentials')
    }
  }

  const logout = () => {
    setUser({} as User)
    Cookies.remove('authToken')
    router.push('/session')
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        loading,
        logout,
        setLoading,
        setSpinning,
        spinning
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
