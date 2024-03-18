import HomePanel from "@/components/self-service/HomePanel";
import NavHeader from "@/components/self-service/NavHeader";
import SidePanel from "@/components/self-service/SidePanel";

const SelfService = () => {
  return(
  <div className="grid grid-cols-[18%,1fr] grid-rows-[4rem,1fr] h-screen overflow-hidden">
    <NavHeader />
    <SidePanel />
    <HomePanel />
  </div>)
}

export default SelfService;