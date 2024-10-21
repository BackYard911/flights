export const buildQueryString = (params: Record<string, string | number>): string => {
    const queryString = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== undefined && value !== null) {
        queryString.append(key, String(value));
      }
    });
    return queryString.toString() ? `?${queryString.toString()}` : '';
  };