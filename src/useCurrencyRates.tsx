import { useQuery } from "@tanstack/react-query";
import { ParsedCnbData } from "./types";

const useCurrencyRates = () => {
  const { error, data } = useQuery<any, any, ParsedCnbData>({
    queryKey: ["cnbData"],
    queryFn: () => fetch(`/api/cnb`).then((res) => res.json()),
  });

  if (error) {
    console.error(error);
    return;
  }

  return data;
};

export default useCurrencyRates;
