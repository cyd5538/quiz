import { create } from 'zustand'
import { User } from 'firebase/auth'

type userStoreType = {
  user: User | null
  setUser: (user: User | null) => void
}

const userStore = create<userStoreType>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))

export default userStore