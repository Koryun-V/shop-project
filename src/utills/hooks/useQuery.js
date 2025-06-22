import {useSearchParams} from 'react-router-dom';
import {useMemo} from "react";
import Utils from "../../components/helpers/Utils";

const useQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = useMemo(() => {
    const queryParams = {}

    searchParams.entries().forEach(([key, value]) => {
      if (queryParams[key]) {
        queryParams[key] = [...(Array.isArray(queryParams[key]) ? queryParams[key] : [queryParams[key]]), value];
      } else {
        queryParams[key] = value;
      }
    })
    Utils.deleteEmptyKeys(queryParams)
    return queryParams
  }, [searchParams]);

  const setQuery = (queryParams, options = {}) => setSearchParams(Utils.deleteEmptyKeys(queryParams), options)
  return {
    query, setQuery,
    queryStringify: `?${searchParams.toString()}`
  }
};


export default useQuery;
