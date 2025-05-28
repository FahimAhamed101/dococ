"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/UI/Dialog"
export default function LogoutModal({ isOpen, onClose }) {
  if (!isOpen) return null
const handleCancel = () => {
    onClose(); // Close the modal
  };

  const handleLogout = () => {
    // Add your logout logic here, e.g., clear auth tokens, redirect
    console.log("Logging out...");
    // Example: localStorage.removeItem('authToken');
    // Example: router.push('/login'); // If using Next.js router
    onClose(); // Close the modal after logout
  };
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
            className="flex-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg h-10 font-medium"
          >
            No
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg h-10 font-medium border-0"
          >
            Yes
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}