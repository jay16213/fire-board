// hotfix for react-apexcharts issue: https://github.com/apexcharts/react-apexcharts/issues/469

"use client";

import { useEffect, useState } from "react";

const ApexChart = (props: any) => {
  const [Chart, setChart] = useState<any>();
  const hasType = typeof props?.type !== "undefined";

  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  return hasType && Chart && <Chart {...props} />;
}

export default ApexChart;
