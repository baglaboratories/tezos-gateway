export default (action, payload, error) => {
  return {
    type: action,
    payload,
    error,
  };
};
