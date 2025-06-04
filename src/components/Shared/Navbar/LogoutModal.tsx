// src/components/LogoutModal.tsx
"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/UI/Dialog"
//import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
//import { useEffect } from "react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const router = useRouter();
 // const [logout, { isSuccess, isLoading }] = useLogoutMutation();

  const handleCancel = () => {
    onClose();
  };

  const handleLogout = () => {
   // logout();
  // Clear tokens from storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      
      // Clear Redux state (you'll need to dispatch your logout action)
      // dispatch(logoutAction());
      
      // Redirect to login
      router.push('/login');
      onClose();

  };

 // useEffect(() => {
  //  if (isSuccess) {
      // Clear tokens from storage
  //    localStorage.removeItem('accessToken');
  //    localStorage.removeItem('refreshToken');
      
      // Clear Redux state (you'll need to dispatch your logout action)
      // dispatch(logoutAction());
      
      // Redirect to login
  //    router.push('/login');
   //   onClose();
   // }
 // }, [isSuccess, router, onClose]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className="sm:max-w-md bg-[#F1F9FF] rounded-[1.5rem]">
        <DialogHeader className="space-y-3 ">
          <DialogTitle className="text-xl font-semibold text-gray-900">Logout</DialogTitle>
          <DialogDescription className="text-gray-600 text-base">
            Are you sure you want to log out?
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleCancel}
            //disabled={isLoading}
            className="flex-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg h-10 font-medium disabled:opacity-50"
          >
            No
          </button>
          <button
            onClick={handleLogout}
           // disabled={isLoading} {isLoading ? 'Logging out...' : 'Yes'}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg h-10 font-medium border-0 disabled:opacity-50"
          >
          yes
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}