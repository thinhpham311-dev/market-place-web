"use client"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/molecules";
import { useRouter } from "next/navigation";
import SignInForm from "./sign-in";
import SignUpForm from "./sign-up";
import ChangePassForm from "./change-password";

interface ITabsAuthProps {
    isSignIn?: boolean;
    isSignUp?: boolean;
    isChangePassWord?: boolean;
    defaultTab?: "signIn" | "signUp" | "changePass";
}

interface TabConfig {
    key: string;
    label: string;
    component: JSX.Element;
    prop: keyof ITabsAuthProps;
    slug: string
}

const tabConfig: TabConfig[] = [
    {
        key: "signIn",
        label: "Sign In",
        component: <SignInForm />,
        prop: "isSignIn",
        slug: "sign-in"
    },
    {
        key: "signUp",
        label: "Sign Up",
        component: <SignUpForm />,
        prop: "isSignUp",
        slug: "sign-up"
    },
    {
        key: "changePass",
        label: "Change Password",
        component: <ChangePassForm />,
        prop: "isChangePassWord",
        slug: "change-password"
    },
];

function TabsAuth({ isSignIn, isSignUp, isChangePassWord, defaultTab }: ITabsAuthProps) {
    const router = useRouter()
    const props: ITabsAuthProps = { isSignIn, isSignUp, isChangePassWord };

    // Use provided defaultTab or determine dynamically
    const resolvedDefaultTab: string = defaultTab || tabConfig.find(({ prop }) => props[prop])?.key || "signIn";

    return (
        <Tabs defaultValue={resolvedDefaultTab} className="w-[400px] mx-auto">
            <TabsList className="grid w-full grid-cols-2">
                {tabConfig.map(({ key, label, prop, slug }) =>
                    props[prop] ? (
                        <TabsTrigger key={key} value={key} onClick={() => router.push(slug)}>
                            {label}
                        </TabsTrigger>
                    ) : null
                )}
            </TabsList>
            {tabConfig.map(({ key, component, prop }) =>
                props[prop] ? (
                    <TabsContent key={key} value={key}>
                        {component}
                    </TabsContent>
                ) : null
            )}
        </Tabs>
    );
}

export default TabsAuth;
