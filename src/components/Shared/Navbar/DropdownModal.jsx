"use client"
import { MailOutlined, UserOutlined, CalendarOutlined, LockOutlined, LogoutOutlined } from "@ant-design/icons";


export default function DropdownModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-40 pr-4" onClick={onClose}>
      <div className="w-64 rounded-lg overflow-hidden shadow-lg" onClick={(e) => e.stopPropagation()}>
       

        <div className="bg-sky-200 rounded-lg overflow-hidden">
          <button className="w-full bg-sky-400 text-white px-4 py-3 flex items-center hover:bg-sky-500 transition-colors">
            <UserOutlined className="mr-3 h-5 w-5" />
            <span>My Account</span>
          </button>

          <button className="w-full text-gray-700 px-4 py-3 flex items-center hover:bg-sky-300 transition-colors">
            <CalendarOutlined className="mr-3 h-5 w-5" />
            <span>My Appointment</span>
          </button>

          <button className="w-full text-gray-700 px-4 py-3 flex items-center hover:bg-sky-300 transition-colors">
            <LockOutlined className="mr-3 h-5 w-5" />
            <span>Change Password</span>
          </button>

          <button className="w-full text-gray-700 px-4 py-3 flex items-center hover:bg-sky-300 transition-colors">
            <LogoutOutlined className="mr-3 h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}
