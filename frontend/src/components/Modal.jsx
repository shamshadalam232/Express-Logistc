export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative">
        
        {/* Close Button */}
        <button 
          className="absolute top-2 right-2 text-xl font-bold"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
}
