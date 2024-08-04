"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import userStore from "@/stores/userStore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { uploadProfileImage } from "@/lib/firestore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, setUser, loading } = userStore();
  const [displayName, setDisplayName] = useState<string>(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState<string>(user?.photoURL || "");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast()
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
      setPhotoURL(URL.createObjectURL(acceptedFiles[0]));
    }
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif']
    },
    multiple: false,
    noClick: true,
    noKeyboard: true
  });

  const handleUpdateProfile = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      let newPhotoURL = photoURL;
      if (file) {
        newPhotoURL = await uploadProfileImage(file, user.uid);
      }

      await updateDoc(doc(db, "users", user.uid), {
        displayName,
        photoURL: newPhotoURL,
      });

      setUser({
        ...user,
        displayName,
        photoURL: newPhotoURL,
      });

      toast({ title: "Profile updated successfully"});
    } catch (error) {
      toast({ title: "Failed to update profile. Please try again"});
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelImage = () => {
    setFile(null);
    setPhotoURL(user?.photoURL || "");
  };

  if (loading) {
    return <div></div>; 
  }

  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <div className="pl-2 flex-1 mx-auto 2xl:w-[1440px] w-full mt-32">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-2xl font-bold mb-4">Profile Edit</h1>
        <div className="mb-4 relative" {...getRootProps()}>
          <input {...getInputProps()} />
          <Avatar className="w-32 h-32 cursor-pointer" onClick={open}>
            <AvatarImage src={photoURL || "/profile.png"} alt="Profile" />
            <AvatarFallback>{displayName}</AvatarFallback>
          </Avatar>
          {file && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-0 right-0"
              onClick={(e) => {
                e.stopPropagation();
                handleCancelImage();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Click or drag and drop to change profile picture
        </p>
        <div className="mb-4 w-full max-w-xs flex flex-col gap-2">
          <Label>
            Name
          </Label>
          <Input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Display Name"
          />
        </div>
        <div className="mb-4 w-full max-w-xs flex flex-col gap-2">
          <Label>Email</Label>
          <Input value={user?.email as string} readOnly/>
        </div>
        <Button 
          className="mt-8" 
          onClick={handleUpdateProfile} 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            'Update Profile'
          )}
        </Button>
      </div>
    </div>
  );
}