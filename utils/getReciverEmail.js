export const getReciverEmail = (userLoggedIn, users) => (
    users?.filter((userToFilter) => userToFilter !== userLoggedIn?.email)[0]
);