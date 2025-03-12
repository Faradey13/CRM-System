import {Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import {routeConfig} from "@/shared/config/routesConfig/routesConfig.ts";


export const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading</div>}>
            <Routes>
                {Object.values(routeConfig).map(({element, path}) =>
                <Route
                element={element}
                path={path}
                key={path}
                />
                )}
            </Routes>

        </Suspense>
    );
};
