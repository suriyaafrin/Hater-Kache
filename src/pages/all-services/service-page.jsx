import { useNavigate, useParams } from "react-router-dom";
import { services } from "../../../data/data";
import Popular from "../../Component/popular/Popular";
import { SettingsIcon, ToolboxIcon } from "../../img_folder/img";
import { ServiceDropdown } from "./service-dropdown";

console.log(services);

function AllServices() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const handleService = (slug) => {
    navigate(`/services/${slug}`);
  };

  const filteredServices = slug
    ? services.find((service) => service.slug === slug).slugData.serviceList
    : services;

  console.log(filteredServices, "filteredServices");
  return (
    <>
      <div className="bg-gray-50 font-sans">
        <section
          className=" mx-auto container max-w-7xl px-20 py-10
                        flex flex-col md:flex-row items-start gap-10"
        >
          <div className=" flex-1 space-y-6">
            <div>
              <h1 className="text-5xl font-extrabold text-[#1E3A5F] leading-tight">
                All <span className="text-[#FF4D7D]">Services</span>
              </h1>
              <p className="mt-4 text-lg text-gray-500 max-w-md leading-relaxed">
                Find professional plumbers for all your home and office plumbing
                needs. Fast, reliable & affordable service near you.
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-3 bg-white shadow-lg
                        rounded-2xl p-2 border border-gray-100 max-w-xl"
            >
              <div
                className="flex items-center gap-2 flex-1 px-3 py-2 rounded-xl
                          bg-gray-50 border border-gray-200
                          focus-within:border-[#FF4D7D] transition-colors"
              >
                <SettingsIcon />
                <ServiceDropdown
                  dropDownData={filteredServices}
                  onChange={handleService}
                />
              </div>
            </div>
          </div>

          <div className="shrink-0 w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-linear-to-br  scale-90 opacity-80" />
            <ToolboxIcon />
          </div>
        </section>
      </div>

      <div className="w-full">
        <Popular />
      </div>
    </>
  );
}

export default AllServices;
