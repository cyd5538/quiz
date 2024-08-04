import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

export async function uploadFile(file: any) {
  const storageRef = ref(storage, `thumbnails/${file.name}`);

  const snapshot = await uploadBytes(storageRef, file);

  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
}

export async function uploadProfileImage(file: File, userId: string) {
  const storageRef = ref(storage, `profiles/${file.name}`);

  const snapshot = await uploadBytes(storageRef, file);

  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
}