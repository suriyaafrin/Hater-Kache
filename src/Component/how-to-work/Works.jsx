import { useEffect, useState } from 'react';
import { steps } from '../../../data/other-Data';


function Works() {
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const isAllDone = activeStep == steps.length - 1;
  return (
    <div className='bg-white py-20 px-20 font-sans w-full '>
      <h2 className='text-xl flex items-center justify-center font-bold text-[#1E3A5F] mb-12'>How it works</h2>
      <div className='flex items-center justify-center '>
        <div className='flex items-start w-full max-w-4xl'>
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            const isPast = index < activeStep;
            return (
              <div key={index} className='flex flex-col items-center flex-1 min-w-0'>
                <div className='flex items-center w-full'>
                  <div onClick={() => setActiveStep(index)}
                    className={["w-11 h-11 rounded-full shrink-0 flex items-center justify-center",
                      "text-white font-bold text-sm cursor-pointer transition-all duration-500",
                      isActive
                        ? "bg-rose-500 ring-4 ring-rose-200 scale-110"
                        : isPast
                          ? "bg-[#1E3A5F]"
                          : "bg-rose-300",
                    ].join(" ")}>
                    {step.number}
                  </div>

                  <div className={["flex-1 border-t-2 transition-all duration-500",
                    isPast || isActive ?
                      "border-blue-900 border-solid"
                      : "border-dashed border-gray-300"
                  ].join(" ")}
                  />
                </div>
                <div className='mt-2.5 text-center'>
                  <p className={["font-bold text-sm transition-colors duration-300",
                    isActive ? "text-rose-500" : "text-[#1E3A5F]",
                  ].join(" ")}>{step.title}</p>
                  <p className='text-gray-400 text-xs mt-0.5 leading-snug'>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
          <div className='flex flex-col items-center'>
            <div className={["w-11 h-11 rounded-full shrink-0 flex items-center justify-center",
              "font-bold text-xs transition-all duration-500",
              isAllDone ?
                "bg-rose-500 ring-4 ring-rose-200 scale-110 text-white"
                : "bg-gray-100 border-2 border-dashed border-gray-300 text-gray-400",
            ].join(" ")}>
              End
            </div>
            <div className='mt-2.5 text-center'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Works
