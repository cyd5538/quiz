import { create } from 'zustand'
import { User } from 'firebase/auth'

type userStoreType = {
  user: User | null
  loading: boolean,
  setUser: (user: User | null) => void
  setLoading: (user: boolean) => void
}

const userStore = create<userStoreType>((set) => ({
  user: null,
  loading: true, 
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}))

export default userStore