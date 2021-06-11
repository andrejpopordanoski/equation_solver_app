export const callInBulk = ({ dispatch, actions }) => {
    actions.forEach(action => {
        dispatch(action);
        // dispatch(action.f(...action.params));
    });
};
