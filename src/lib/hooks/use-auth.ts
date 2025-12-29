import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/store/auth/userSlice";
import { apiSignIn, apiSignUp } from "@/services/AuthService";
import { onSignInSuccess } from "@/store/auth/sessionSlice";
import appConfig from "@/configs/app.config";
import { REDIRECT_URL_KEY } from "@/constants/app/app.constant";
import { useNavigate } from "react-router-dom";
import useQuery from "./use-query";
import { IUser } from "@/interfaces/user";

function useAuth() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const query = useQuery();

  const { token, signedIn } = useSelector(
    (state: { auth: { session: { token: string; signedIn: boolean } } }) => state.auth.session,
  );

  const signIn = async (values: { email: string; password: string }) => {
    try {
      const resp = (await apiSignIn({
        _id: "",
        email: values.email,
        password: values.password,
      })) as { data: { token: string; user?: IUser } };
      if (resp.data) {
        const { token } = resp.data;
        dispatch(onSignInSuccess(token));
        if (resp.data.user) {
          dispatch(
            setUser(
              resp.data.user || {
                avatar: "",
                userName: "Anonymous",
                authority: ["USER"],
                email: "",
              },
            ),
          );
        }
        const redirectUrl = query.get(REDIRECT_URL_KEY);
        navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
        return {
          status: "success",
          message: "",
        };
      }
    } catch (errors: any) {
      return {
        status: "failed",
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };

  const signUp = async (values: { email: string; password: string }) => {
    try {
      const resp = (await apiSignUp({ _id: "", ...values })) as {
        data: { token: string; user?: IUser };
      };
      if (resp.data) {
        const { token } = resp.data;
        dispatch(onSignInSuccess(token));
        if (resp.data.user) {
          dispatch(
            setUser(
              resp.data.user || {
                avatar: "",
                userName: "Anonymous",
                authority: ["USER"],
                email: "",
              },
            ),
          );
        }
        const redirectUrl = query.get(REDIRECT_URL_KEY);
        navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
        return {
          status: "success",
          message: "",
        };
      }
    } catch (errors: any) {
      return {
        status: "failed",
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };

  return {
    authenticated: token && signedIn,
    signIn,
    signUp,
  };
}

export default useAuth;
