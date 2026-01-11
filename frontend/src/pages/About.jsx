export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-10">

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">
        About Us
      </h1>

      {/* Main Section */}
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        We at <span className="font-bold">Express Logistics</span> are dedicated to 
        simplifying logistics for individuals and businesses across India. 
        Our mission is to make delivery reliable, fast, and transparent using 
        technology-driven solutions and a strong partner network.
      </p>

      {/* Image (optional) */}
      

      {/* Mission Section */}
      <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        To build India’s most efficient and trustworthy logistics network by 
        empowering delivery partners, improving customer experience, and ensuring 
        timely delivery of every shipment.
      </p>

      {/* Why Choose Us */}
      <h2 className="text-2xl font-semibold mb-3">Why Choose Us?</h2>
      <ul className="list-disc ml-8 text-gray-700 space-y-2">
        <li>Fast and reliable delivery across India</li>
        <li>Real-time shipment tracking</li>
        <li>Trusted by thousands of partners</li>
        <li>Transparent approval and onboarding process</li>
        <li>Dedicated customer support team</li>
      </ul>

      {/* Vision Section */}
      <h2 className="text-2xl font-semibold mt-8 mb-2">Our Vision</h2>
      <p className="text-gray-700 leading-relaxed">
        To become India's most preferred logistics partner by building 
        sustainable solutions and expanding our network to serve customers 
        in every corner of the country.
      </p>

      <p>Fashner is an independent logistics platform and is not affiliated with any third-party logistics brands.</p>

    </div>
  );
}
