import { getBaseUrl } from "@/lib/utils";
import * as AdminJSMongoose from '@adminjs/mongoose'
import AdminJS, { type AdminJSOptions } from "adminjs";
import * as Models from './models'
import { dark, light, noSidebar } from '@adminjs/themes'


AdminJS.registerAdapter(AdminJSMongoose)
const buildResources = (): AdminJSOptions["resources"] => [
  {
    resource: Models.Customer,
    options: {
      properties: {
        name: { isVisible: { list: true, edit: true, filter: true, show: true } },
        phone: { isVisible: { list: true, edit: true, filter: true, show: true } },
        role: { isVisible: { list: true, edit: true, filter: true, show: true } },
        isActivated: { isVisible: { list: true, edit: true, filter: false, show: true } },
      }
    }
  },
  {
    resource: Models.DeliveryPartner,
    options: {
      properties: {
        name: { isVisible: { list: true, edit: true, filter: true, show: true } },
        phone: { isVisible: { list: true, edit: true, filter: true, show: true } },
        role: { isVisible: { list: true, edit: true, filter: true, show: true } },
        address: { isVisible: { list: true, edit: true, filter: false, show: true } },
        branch: { isVisible: { list: true, edit: true, filter: false, show: true } },
      }
    }
  },
  {
    resource: Models.Admin,
    options: {
      properties: {
        name: { isVisible: { list: true, edit: true, filter: true, show: true } },
        phone: { isVisible: { list: true, edit: true, filter: true, show: true } },
        role: { isVisible: { list: true, edit: true, filter: true, show: true } },
        isActivated: { isVisible: { list: true, edit: true, filter: false, show: true } },
      }
    }
  },
  {
    resource: Models.Branch,
    options: {
      properties: {
        name: { isVisible: { list: true, edit: true, filter: true, show: true } },
        address: { isVisible: { list: true, edit: true, filter: true, show: true } }
      }
    }
  },
  {
    resource: Models.Category,
    options: {
      properties: {
        name: { isVisible: { list: true, edit: true, filter: true, show: true } },
        image: { isVisible: { list: true, edit: true, filter: false, show: true } }
      }
    }
  },
  {
    resource: Models.Product,
    options: {
      properties: {
        name: { isVisible: { list: true, edit: true, filter: true, show: true } },
        price: { isVisible: { list: true, edit: true, filter: true, show: true } },
        discountPrice: { isVisible: { list: true, edit: true, filter: true, show: true } },
        quantity: { isVisible: { list: true, edit: true, filter: false, show: true } },
        image: { isVisible: { list: true, edit: true, filter: false, show: true } },
        category: { isVisible: { list: true, edit: true, filter: true, show: true } },
      }
    }
  }
];

export const options: AdminJSOptions = {
  assetsCDN: process.env.NODE_ENV === "production" ? getBaseUrl() : undefined,
  rootPath: "/admin",
  resources: buildResources(),
  branding: {
    companyName: "Market Place Admin",
    withMadeWithLove: true,
    favicon: 'https://res.cloudinary.com/di6zporch/image/upload/t_My Logo/v1730777885/market-place-logo_iz3rdk.svg',
    logo: "https://res.cloudinary.com/di6zporch/image/upload/t_Banner 16:9/v1730777885/market-place-logo_iz3rdk.svg",
  },
  defaultTheme: light.id,
  availableThemes: [dark, light, noSidebar],
};


export const adminJs = new AdminJS(options);
