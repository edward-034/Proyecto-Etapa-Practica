import { useEffect } from "react";
import useAuth from "../store/auth.store";
import { profile } from "../services/auth.api";

export function useSession() {
    const setUser = useAuth((s) => s.setUser);

    useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                const user = await profile();
                if (mounted) {
                    setUser(user);
                }
            } catch {
                if (mounted) {
                    setUser(null);
                }
            }
        }

        load();

        return () => {
            mounted = false;
        };
    }, [setUser]);
}