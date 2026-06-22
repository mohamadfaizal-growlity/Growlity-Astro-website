import { createBrowserRouter } from "react-router";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import ServicesPage from "./pages/services";
import IndustriesPage from "./pages/industries";
import FrameworksPage from "./pages/frameworks";
import ESGTechPage from "./pages/esgtech";
import ResourcesPage from "./pages/resources";
import CustomerSuccessPage from "./pages/customer-success";
import ContactPage from "./pages/contact";

// Service Pages
import ESGStrategyPage from "./pages/services/esg-strategy";
import CarbonAccountingPage from "./pages/services/carbon-accounting";
import NetZeroPage from "./pages/services/net-zero";
import ESGReportingPage from "./pages/services/esg-reporting";
import EcoVadisPage from "./pages/services/ecovadis";
import CDPPage from "./pages/services/cdp";

// Framework Pages
import GRIPage from "./pages/frameworks/gri";
import ISSBPage from "./pages/frameworks/issb";
import SASBPage from "./pages/frameworks/sasb";
import TCFDPage from "./pages/frameworks/tcfd";

// Industry Pages
import ManufacturingPage from "./pages/industries/manufacturing";
import ChemicalsPage from "./pages/industries/chemicals";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/about",
    Component: AboutPage,
  },
  {
    path: "/services",
    Component: ServicesPage,
  },
  {
    path: "/services/esg-strategy",
    Component: ESGStrategyPage,
  },
  {
    path: "/services/carbon-accounting",
    Component: CarbonAccountingPage,
  },
  {
    path: "/services/net-zero",
    Component: NetZeroPage,
  },
  {
    path: "/services/esg-reporting",
    Component: ESGReportingPage,
  },
  {
    path: "/services/ecovadis",
    Component: EcoVadisPage,
  },
  {
    path: "/services/cdp",
    Component: CDPPage,
  },
  {
    path: "/industries",
    Component: IndustriesPage,
  },
  {
    path: "/industries/manufacturing",
    Component: ManufacturingPage,
  },
  {
    path: "/industries/chemicals",
    Component: ChemicalsPage,
  },
  {
    path: "/frameworks",
    Component: FrameworksPage,
  },
  {
    path: "/frameworks/gri",
    Component: GRIPage,
  },
  {
    path: "/frameworks/issb",
    Component: ISSBPage,
  },
  {
    path: "/frameworks/sasb",
    Component: SASBPage,
  },
  {
    path: "/frameworks/tcfd",
    Component: TCFDPage,
  },
  {
    path: "/esgtech",
    Component: ESGTechPage,
  },
  {
    path: "/resources",
    Component: ResourcesPage,
  },
  {
    path: "/customer-success",
    Component: CustomerSuccessPage,
  },
  {
    path: "/contact",
    Component: ContactPage,
  },
]);
