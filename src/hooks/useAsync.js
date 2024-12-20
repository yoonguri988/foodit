import { useCallback, useState } from "react";

function useAsync(asyncFunc) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFunction = useCallback(
    async (...args) => {
      try {
        setPending(true);
        setError(null);
        return await asyncFunc(...args);
      } catch (e) {
        setError(e);
        return;
      } finally {
        setPending(false);
      }
    },
    [asyncFunc]
  );

  return [pending, error, wrappedFunction];
}

export default useAsync;
