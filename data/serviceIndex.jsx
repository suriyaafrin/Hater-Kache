
import { acRepairServices, acRepairTechnicians } from "./all-Data/acRepair";
import { applianceRepairServices, applianceRepairTechnicians } from "./all-Data/applianceRepair";
import { carpenters, carpentryServices } from "./all-Data/carpentry";
import { cctvSecurityWorkers, cctvServices } from "./all-Data/CCTVSecurity";
import { deepCleaners, deepCleaningServices } from "./all-Data/deepCleaning";
import { electricalServices, electricians } from "./all-Data/electricalData";
import { garbageRemovalServices, garbageRemovalWorkers } from "./all-Data/garbageRemoval";
import { gardeningServices, gardeningWorkers } from "./all-Data/gardening";
import { homeSecurityProviders, homeSecurityServices } from "./all-Data/homeSecurity";
import { ironingServices, ironingWorkers } from "./all-Data/ironing";
import { laundryServices, laundryWorkers } from "./all-Data/laundry";
import { movingShiftingProviders, movingShiftingServices } from "./all-Data/movingShifting";
import { painters, paintingServices } from "./all-Data/painting";
import { pestControlServices, pestControlWorkers } from "./all-Data/pestControl";
import { petCareProviders, petCareServices } from "./all-Data/petCare";
import { plumbers, plumbersServices } from "./all-Data/PlumberData";
import { roofingServices, roofingWorkers } from "./all-Data/roofing";
import { sofaCarpetCleaningWorkers, sofaCarprtCleaningServices } from "./all-Data/sofaCarpetClean";
import { waterTankCleaningServices, waterTankCleaningWorkers } from "./all-Data/waterTankCleaning";

export const serviceDataMap={
    "ac-Repair": { serviceList:acRepairServices, technicians:acRepairTechnicians},
    "plumbing" : { serviceList : plumbersServices, technicians:plumbers},
    "electrician":{ serviceList: electricalServices, technicians:electricians},
    "applianceRepair" : { serviceList:applianceRepairServices, technicians:applianceRepairTechnicians},
    "carpentry": { serviceList:carpentryServices, technicians:carpenters},
    "cctvSecurity" : { serviceList : cctvServices, technicians:cctvSecurityWorkers},
    "deepCleaning":{ serviceList: deepCleaningServices, technicians:deepCleaners},
    "garbageRemoval" : { serviceList:garbageRemovalServices, technicians:garbageRemovalWorkers},
    "gardening": { serviceList:gardeningServices, technicians:gardeningWorkers},
    "homeSecurity" : { serviceList : homeSecurityServices, technicians:homeSecurityProviders},
    "ironing":{ serviceList: ironingServices, technicians:ironingWorkers},
    "laundry" : { serviceList:laundryServices, technicians:laundryWorkers},
    "movingShifting": { serviceList:movingShiftingServices, technicians:movingShiftingProviders},
    "painting" : { serviceList : paintingServices, technicians:painters},
    "pestControl":{ serviceList: pestControlServices, technicians:pestControlWorkers},
    "petCare" : { serviceList:petCareServices, technicians:petCareProviders},
    "roofing": { serviceList:roofingServices, technicians:roofingWorkers},
    "sofaCarpetCleaning" : { serviceList : sofaCarprtCleaningServices, technicians:sofaCarpetCleaningWorkers},
    "waterTankCleaner":{ serviceList: waterTankCleaningServices, technicians:waterTankCleaningWorkers},

};