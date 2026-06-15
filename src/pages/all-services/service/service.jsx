import { useParams } from "react-router-dom";
import PlumbingHero from "../../../plumbing/PlumbingHero";


export default function Service() {
    const { slug } = useParams();
    return (
        <div>
            <PlumbingHero slug={slug} />
        </div>
    )
}
