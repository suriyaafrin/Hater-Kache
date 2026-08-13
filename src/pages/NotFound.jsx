import { LuCompass } from "react-icons/lu";
import { Button, EmptyState } from "../ui/primitives";

export default function NotFound() {
  return (
    <div className="shell max-w-xl py-20 lg:py-28">
      <EmptyState
        icon={LuCompass}
        title="This page does not exist"
        body="The link may be out of date. Everything on Hater-Kache is reachable from the home page or the service list."
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <Button to="/">Go home</Button>
            <Button variant="secondary" to="/services">
              Browse services
            </Button>
          </div>
        }
      />
    </div>
  );
}
