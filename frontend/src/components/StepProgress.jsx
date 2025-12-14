export default function StepProgress({ status }) {
  const steps = [
    "Registration",
    "Agreement",
    "NOC Activated",
    "Visiting Team",
    "Workspace Setup",
  ];

  const currentStep = steps.indexOf(status);

  return (
    <div className="w-full mt-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            {/* Circle */}
            <div
              className={`w-6 h-6 rounded-full 
              ${
                index <= currentStep
                  ? "bg-yellow-400"
                  : "bg-gray-300"
              }`}
            />

            {/* Line */}
            {index !== steps.length - 1 && (
              <div
                className={`h-1 w-full 
                ${
                  index < currentStep
                    ? "bg-yellow-400"
                    : "bg-gray-300"
                }`}
              />
            )}

            {/* Text */}
            <p className="text-xs text-center mt-2 px-1">
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
