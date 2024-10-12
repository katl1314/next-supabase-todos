import React, { useEffect, useState } from "react";

const useHydrate = () => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true); // hydrate가 되었으면 true으로 변경
  }, []);
  return { mounted: hydrated };
};

export default useHydrate;
