import React from "react";
import { useLoading, Grid } from '@agney/react-loading';
import '../index.css'


function Loader() {
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <Grid width="100" />,
    });
    return (
        <div className="Loader">
            {/* Accessibility props injected to container */}
            <section {...containerProps}>
                {indicatorEl} {/* renders only while loading */}
            </section>
        </div>
    );
}

export default Loader;
