import { useParams } from "react-router-dom";
import PlumbingHero from "../../../plumbing/PlumbingHiro";

export default function Service() {
    const { serviceId } = useParams();
    return (
        <div>
            <PlumbingHero serviceName={serviceId} />
        </div>
    )
}
