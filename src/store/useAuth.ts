import { useMemo } from "react";

import { selectCurrentUser } from "./hooks";
import { useSelector } from "react-redux";

export const useAuth = () => {
    const user  = useSelector(selectCurrentUser)

    return useMemo(() => ({ user}), [user])
}