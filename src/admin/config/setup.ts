import { getBaseUrl } from "@/lib/utils";
import * as AdminJSMongoose from '@adminjs/mongoose'
import AdminJS, { type AdminJSOptions } from "adminjs";
import * as Models from '../models'
import { dark, light, noSidebar } from '@adminjs/themes'
import AdminJSExpress from "@adminjs/express";
import { Express } from "express";
import {
  authenticate, NEXT_PUBLIC_COOKIE_PASSWORD,
  sessionStore
} from "@/admin/config/config";
import { productParent, userParent, orderParent } from "../constants/icons.constant";

AdminJS.registerAdapter(AdminJSMongoose)

export const options: AdminJSOptions = {
  assetsCDN: process.env.NEXT_PUBLIC_NODE_ENV === "production" ? getBaseUrl() : undefined,
  rootPath: "/admin",
  resources: [
    {
      resource: Models.Customer,
      options: {
        parent: userParent,
        properties: {
          _id: { isVisible: { list: false, edit: false, filter: false, show: false } },
          name: { isVisible: { list: true, edit: true, filter: true, show: true } },
          phone: { isVisible: { list: true, edit: true, filter: true, show: true } },
          role: { isVisible: { list: false, edit: false, filter: false, show: false } },
          isActivated: { isVisible: { list: true, edit: true, filter: false, show: true } },
        }
      }
    },
    {
      resource: Models.DeliveryPartner,
      options: {
        parent: userParent,
        properties: {
          _id: { isVisible: { list: false, edit: false, filter: false, show: false } },
          password: { isVisible: { list: false, edit: true, filter: true, show: true } },
          name: { isVisible: { list: true, edit: true, filter: true, show: true } },
          phone: { isVisible: { list: true, edit: true, filter: true, show: true } },
          role: { isVisible: { list: false, edit: false, filter: false, show: false } },
          address: { isVisible: { list: true, edit: true, filter: false, show: true } },
          branch: { isVisible: { list: false, edit: true, filter: false, show: true } },
        }
      }
    },
    {
      resource: Models.Admin,
      options: {
        parent: userParent,
        properties: {
          _id: { isVisible: { list: false, edit: false, filter: false, show: false } },
          name: { isVisible: { list: true, edit: true, filter: true, show: true } },
          role: { isVisible: { list: false, edit: false, filter: false, show: false } },
          isActivated: { isVisible: { list: true, edit: true, filter: false, show: true } },
        }
      }
    },
    {
      resource: Models.Branch,
      options: {
        parent: productParent,
        properties: {
          _id: { isVisible: { list: false, edit: false, filter: false, show: false } },
          name: { isVisible: { list: true, edit: true, filter: true, show: true } },
          address: { isVisible: { list: true, edit: true, filter: true, show: true } }
        }
      }
    },
    {
      resource: Models.Category,
      options: {
        parent: productParent,
        properties: {
          name: { isVisible: { list: true, edit: true, filter: true, show: true } },
          image: { isVisible: { list: true, edit: true, filter: false, show: true } }
        }
      }
    },
    {
      resource: Models.Product,
      options: {
        parent: productParent,
        properties: {
          name: { isVisible: { list: true, edit: true, filter: true, show: true } },
          price: { isVisible: { list: true, edit: true, filter: true, show: true } },
          discountPrice: { isVisible: { list: true, edit: true, filter: true, show: true } },
          quantity: { isVisible: { list: true, edit: true, filter: false, show: true } },
          image: { isVisible: { list: true, edit: true, filter: false, show: true } },
          category: { isVisible: { list: true, edit: true, filter: true, show: true } },
        }
      }
    },
    {
      resource: Models.Review,
      options: {
        parent: productParent,
        properties: {
          _id: { isVisible: { list: false, edit: false, filter: false, show: false } },
          productId: { isVisible: { list: true, edit: true, filter: true, show: true } },
          userId: { isVisible: { list: true, edit: true, filter: true, show: true } },
          rating: { isVisible: { list: true, edit: true, filter: true, show: true } },
          createdAt: { isVisible: { list: true, edit: true, filter: false, show: true } },
        },
      }
    },
    {
      resource: Models.Counter,
      options: {
        parent: orderParent,
      }
    },
    {
      resource: Models.Order,
      options: {
        parent: orderParent,
        properties: {
          orderId: { isVisible: { list: false, edit: false, filter: false, show: false } },
          customer: { isVisible: { list: true, edit: true, filter: true, show: true } },
          deliveryPartner: { isVisible: { list: true, edit: true, filter: true, show: true } },
          status: { isVisible: { list: true, edit: true, filter: true, show: true } },
          createdAt: { isVisible: { list: true, edit: true, filter: false, show: true } },
          updatedAt: { isVisible: { list: true, edit: true, filter: false, show: true } },
        },
      }
    },
  ],
  branding: {
    companyName: "Admin | Market Place ",
    withMadeWithLove: true,
    favicon: 'https://res.cloudinary.com/di6zporch/image/upload/t_My Logo/v1730777885/market-place-logo_iz3rdk.svg',
    logo: "https://res.cloudinary.com/di6zporch/image/upload/t_Banner 16:9/v1730777885/market-place-logo_iz3rdk.svg",
  },
  locale: {
    language: 'en',
    translations: {
      en: {
        components: {
          Login: {
            welcomeHeader: "Welcome to Market Place",
            welcomeMessage: "Welcome to Market Place",
            welcomeImage: "",
            properties: {
              email: "Email user",
              password: "Password user"
            },
            loginButton: "Submit"
          }
        },
        messages: {
          welcomeOnBoard_title: 'New dashboard title',
        },
      }

    }
  },
  defaultTheme: light.id,
  availableThemes: [dark, light, noSidebar],
};

export const adminJs = new AdminJS(options);

export const buildAdminRouter = async (app: Express): Promise<void> => {
  const adminRouter = await AdminJSExpress.buildAuthenticatedRouter(
    adminJs,
    {
      authenticate,
      cookiePassword: NEXT_PUBLIC_COOKIE_PASSWORD as string,
      cookieName: 'adminjs',
    },
    null,
    {
      store: sessionStore,
      saveUninitialized: true,
      resave: true,
      secret: NEXT_PUBLIC_COOKIE_PASSWORD as string,
      cookie: {
        httpOnly: process.env.NEXT_PUBLIC_NODE_ENV === 'production',
        secure: process.env.NEXT_PUBLIC_NODE_ENV === 'production',
      },
    }
  );
  app.use(adminJs.options.rootPath, adminRouter);
};

