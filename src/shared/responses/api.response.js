export const successResponse = (data) => {
  return {
    success: true,
    data,
    error: null,
  };
};

export const errorResponse = (code, message) => {
  return {
    success: false,
    data: null,
    error: {
      code,
      message,
    },
  };
};