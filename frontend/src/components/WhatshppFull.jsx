import whatsappIcon from "/unnamed.webp";

export default function WhatsAppFull() {
    return (
        <a
            href="https://wa.me/918434805697"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50"
        >   
            <div className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-full shadow-lg transition">
                <img
                    src={whatsappIcon}
                    alt="WhatsApp Icon" 
                    className="w-6 h-6 mr-2"
                />
                <span>Chat with us on WhatsApp</span>
            </div>
        </a>
    );
}
